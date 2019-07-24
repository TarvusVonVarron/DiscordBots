const Discord = require('discord.js');

const tta = new Discord.Client();

const mysql = require('mysql');
const con = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '7420952d',
  database : 'tta',
  charset : 'utf8mb4'
});
tta.setMaxListeners(30);
con.connect((err) =>{   
});

   //запись в базу
tta.on('message', message => {
   if(message.author === tta.user) return;

   let sql = 'SELECT DiscordUserId FROM tta.userdata;'
      con.query(sql, function(err, result){
         let isMember = false;
         result.forEach(element => {
            if(element.DiscordUserId===message.author.id)
            {
               isMember=true;
               return;
            }
         });
         if(isMember==false)
         {
            let sql = "insert tta.userdata (DiscordUserId, UserName) values ('"+message.author.id+"', '"+message.author.username+"')"
            con.query(sql, function(err, result){
               });
         }
});
})

var userThings;

    //посмотреть инвентарь
tta.on('message', message => {
    if(message.author === tta.user) return;

    if(message.content.toLowerCase()=="вещи")
    {
       let sql = 'SELECT * FROM tta.userdata where DiscordUserId='+message.author.id+';'
      con.query(sql, function(err, result){
         userThings = result[0].Things;
         if(userThings==null)
         message.channel.send("у вас ничего нет")
         else
         message.channel.send(userThings);
      })
    }
 });

   //передать деньги
 tta.on('message', message => {
   if(message.author === tta.user) return;
   message.content = message.content.replace(/ +/g, ' ').trim();
   if(message.content.toLowerCase().startsWith("дать деньги"))
   {
     let sql = 'SELECT * FROM tta.userdata where DiscordUserId='+message.author.id+';'
     con.query(sql, function(err, result){
        userThings = result[0].Balance;
        
        let words = message.content.split(' ');
         if(parseInt(userThings)<parseInt(words[3]))
         {
            message.channel.send("У вас недостаточно денег на счету. Ваш текущий баланс="+parseInt(userThings))
            return;
         }
        message.channel.send("С вашего счёта снято "+words[3]+ " гривень. Осталось "+(parseInt(userThings)-parseInt(words[3])).toString())
  
        sql = "UPDATE tta.userdata SET Balance = "+(parseInt(userThings)-parseInt(words[3]))+" WHERE DiscordUserId="+message.author.id+";";

        con.query(sql, function(err, result){
      })

      words = message.content.split(' ');

      let userId = words[2].match(/\d+/);
 
      sql = "SELECT * FROM tta.userdata where DiscordUserId="+userId+";"
 
       con.query(sql, function(err, result){
 
          words[3]=parseInt(words[3])+parseInt(result[0].Balance);
          
          sql = "UPDATE tta.userdata SET Balance = "+words[3]+" WHERE DiscordUserId = '"+words[2].match(/\d+/)+"';"
 
       con.query(sql, function(err, result){
       })
       })      
     })
   }  
});

//посмотреть баланс
 tta.on('message', message => {
    if(message.author === tta.user) return;
    if(message.content.toLowerCase()=="кошелёк")
   {
     let sql = 'SELECT * FROM tta.userdata where DiscordUserId='+message.author.id+';'
     con.query(sql, function(err, result){
        message.channel.send("Ваш баланс равен: "+result[0].Balance);
     })
   }
 });

 tta.on('message', message => {
    if(message.author === tta.user) return;
    if(message.content.toLowerCase()=="тта")
    {
    }
    //продать
 });



//передать вещи
 tta.on('message', message => {
    if(message.author === tta.user) return;
        if(message.content.toLowerCase().startsWith("передать"))
   {
     let sql = 'SELECT * FROM tta.userdata where DiscordUserId='+message.author.id+';'
     con.query(sql, function(err, result){
        let words = message.content.split(" ");
        let dbThings = result[0].Things.toString();
        let things= [];
      for(let i=2; i<words.length; i++)
         {
            things.push(words[i]);
         }
let errorThings = "";
         things.forEach(thing => {
            if(dbThings.indexOf(thing)==-1)
            {
               errorThings =errorThings + thing+", ";
            }
         });
         errorThings=errorThings.substring(0, errorThings.length - 2);

         if(errorThings!="")
         {
         message.channel.send("У вас нет следующих вещей: "+errorThings+".")
         return;
         }
         let res = "";
         var sended = ", ";
         dbThings = dbThings.split(',');
         for(let i=0; i<dbThings.length; i++)
         {
            for(let j=0; j<things.length; j++)
            {
               if(dbThings[i].replace(/ +/g, ' ').trim()==things[j].replace(/ +/g, ' ').trim())
               {
                  dbThings[i]="";
                  sended = sended + things[j].replace(/ +/g, ' ').trim() + ", ";
               }
            }
         }

         sended=sended.substring(0, sended.length - 2);
         dbThings.forEach(element => {
            if(element!='')
            res = res+element+", "
         });

         res=res.substring(0, res.length - 2);

         sql = "UPDATE tta.userdata SET Things = '"+res+"' WHERE DiscordUserId = '"+message.author.id+"';"
        con.query(sql, function(err, result){
        })

         sql = 'SELECT * FROM tta.userdata where DiscordUserId='+words[1].match(/\d+/)+';'
         con.query(sql, function(err, result){
         sql = "UPDATE tta.userdata SET Things = '"+result[0].Things + sended +"' WHERE DiscordUserId = '"+words[1].match(/\d+/)+"';"

      con.query(sql, function(err, result){

      })
      })

      
     })
   }
 });

 tta.storage = new Discord.Collection();

 tta.on("message", msg =>{
   if(msg.content.toLowerCase().startsWith("обмен с "))
   {   
   tta.storage.set(msg.author.id, msg.content.split(" ")[2].match(/\d+/))
   tta.storage.set(msg.author.username, msg.author.id) 
   msg.channel.send(msg.content.split(" ")[2]+" введите 'да' если подтверждаете начало обмена, или 'нет' в противном случае")
   }
 })

 
 tta.on("message", msg =>{
   let masStor = tta.storage.array();
  if(masStor[2]==1 && (masStor[3]==0 || masStor[4]==0))//работает если ни по одному пользователю не прошло 
  {   
     if(msg.author.id==masStor[0] && masStor[3]==0)//пользователь-инициатор обмена
     {
        let i = 0;
        tta.storage.forEach(element => {
           if(i!=3){i++; return}
           else
           {
            i++;
            tta.storage.set("first", 1)

            let sql = `SELECT * FROM tta.userdata where DiscordUserId=`+msg.author.id+`;`
            con.query(sql, function(err, result){
               userBalance = result[0].Balance;
               let thingsAndMoney = msg.content.split('.')
               let money = thingsAndMoney[1].trim().split(' ')
                if(parseInt(userBalance)<parseInt(money[1]))
                {
                  msg.channel.send("У вас недостаточно денег на счету. Ваш текущий баланс="+parseInt(userBalance))
                   return;
                }
                msg.channel.send("С вашего счёта снято "+money[1]+ " гривень. Осталось "+(parseInt(userBalance)-parseInt(money[1])).toString())
         
               sql = "UPDATE tta.userdata SET Balance = "+(parseInt(userBalance)-parseInt(money[1]))+" WHERE DiscordUserId="+msg.author.id+";";
       
               con.query(sql, function(err, result){
             })
       
             words = msg.content.split(' ');
       
             let userId = masStor[1];
        
             sql = "SELECT * FROM tta.userdata where DiscordUserId="+userId+";"
        
              con.query(sql, function(err, result){
        
               money[1]=parseInt(money[1])+parseInt(result[0].Balance);
                 
                 sql = "UPDATE tta.userdata SET Balance = "+money[1]+" WHERE DiscordUserId = '"+userId+"';"
        
              con.query(sql, function(err, result){
              })
              })      
            })

            sql = `select l.Name as 'Thing', i.Count as 'Count', l.Cost as 'Price', t.name as 'Type', i.ThingId from userdata u 
            left join inventory i on u.DiscordUserId=i.UserId
            left join listofthings l on l.id = i.ThingId
            left join typesofthings t on l.typeId = t.id
            where u.DiscordUserId =`+msg.author.id+`;`
            con.query(sql, function(err, result){
               console.log(result)
               let thingsAndMoney = msg.content.split('.')
               //получаем строку типа вещь1 х2, вещь2, вещь3 х5
               thingsAndMoney[0] = thingsAndMoney[0].substring(5,thingsAndMoney[0].length).trim() 

               let things = thingsAndMoney[0].split(',')
               let errorThings = "";

               for(let i=0; i<result.length;i++)
               {
                  let err=1;
                  //проверяем сперва на наличие таких предметов
                  let jj;
                  for(let j=0; j<things.length;j++)
                  {
                     if(things[j].substring(0, things[j].indexOf(" ")).trim()==result[i].Thing)
                     {
                        err=0;
                        break;
                     }
                     jj=j;
                  }
                  if(err==1)
                     errorThings=errorThings+things[jj].substring(0, things[jj].indexOf(" ")).trim()+", ";
               }

                errorThings=errorThings.substring(0, errorThings.length - 2);
       
                if(errorThings!="")
                {
                  msg.channel.send("У вас нет следующих вещей: "+errorThings+".")
                return;
                }
                //теперь проверяем на соответствие кол-ва предметов
                for(let i=0; i<result.length;i++)
                {
                   let countErr=1;
                   let jj;
                   for(let j=0; j<things.length;j++)
                   {
                      if(parseInt(things[j].substring(things[j].indexOf(" ")+2, things[j].length).trim())<=result[i].Count)
                      {
                         result[i].Count = result[i].Count - parseInt(things[j].substring(things[j].indexOf(" ")+2, things[j].length).trim());
                        countErr=0;
                         break;
                      }
                      jj=j;
                   }
                   if(err==1)
                      errorThings=errorThings+things[jj]+", ";
                }

                if(errorThings!="")
                {
                  msg.channel.send("Вы пытаетесь отдать слишком много следующих вещей: "+errorThings+".")
                return;
                }


                result.forEach(element => {
                      sql = "update inventory set count = "+element.Count+" where userId='"+msg.author.id+"' and ThingId = "+element.ThingId+";"
                      con.query(sql, function(err, result){
                         console.log(err)
                      })   
                });    
                sql = "delete from inventory where Count=0;"
                con.query(sql, function(err, result){
                  console.log(err)
               })   
             
            })
           }
              
        });
     }
     if(msg.author.id==masStor[1] && masStor[4]==0)
     {
      
        let j = 0;
        tta.storage.forEach(element => {
           if(j!=4){j++; return}
           else
           {
            j++;
            tta.storage.set("second", 1)    
           }
        });
     }
  }
})

 tta.on("message", msg =>{
   if(msg.author.id == tta.storage.first())
   {   
   if(msg.content=='да')
   {
      tta.storage.set("true", 1)
      tta.storage.set("first", 0)
      tta.storage.set("second", 0)
      msg.channel.send('Введите товары для обмена одним сообщением в формате "Вещи: вещь1 х2, вещь2, вещь3 х5. Деньги: хххх"')
      let a = tta.storage.array();
   }
   if(msg.content=='нет')
   tta.storage=new Discord.Collection();
   }
 })

 tta.on('message', message => {
   if(message.author === tta.user) return;
       if(message.content.toLowerCase() == "хочу печеньку")
  {
   let sql = 'SELECT * FROM tta.userdata where DiscordUserId='+message.author.id+';'
   con.query(sql, function(err, result){
      let res = result[0].Things.toString();
      res = res + ", печенька"
      sql = "UPDATE tta.userdata SET Things = '"+res+"' WHERE DiscordUserId = '"+message.author.id+"';"
      con.query(sql, function(err, result){
      })
   })

   }
  });




tta.login('NTgzNTQ4MjQ0ODY5Nzc1MzYx.XPEVIg.twmuCBQsEL28OLkH88kCmWLvvyI');
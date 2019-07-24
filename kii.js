const Discord = require('discord.js');

const client = new Discord.Client();

 
 client.on('message', message => {
    if(message.author === client.user) return;
    if(message.content.toLowerCase().startsWith('дыргос'))
    if(message.author.username ==='nllnwk') 
    {message.channel.send('Я люблю мыш, она пушистая и тёплая!');}
    else
     {
        message.channel.send('Заткни пасть!');
     }
 });

var rolesList = ['faf','paradox','warhammer 40k','шахматист','skymp','mount&blade'];

 client.on('message', msg => {//Отвечает игроку

    if(msg.content.toLowerCase().startsWith("кии, дай роль")) {
        try{
        if(rolesList.indexOf(msg.content.split(" ")[3].toLowerCase())!= -1)
        {
            let role = msg.guild.roles.find(c => c.name.toLowerCase() === msg.content.split(" ")[3].toLowerCase());            
            msg.member.addRole(role.id);
            msg.reply(`Вам выдана роль `+role.name);
            console.log(`Пользователю была выдана роль `)
        }
        else
            msg.reply("Такая роль не существует, или я не могу её Вам выдать.");
    }
    catch(e){msg.author.send("Прошу прощения, но я не могу обработать данную команду здесь. Пожалуйста, напишите её в текстовом канале Игрового Сервера Альтерра.")}

    }
    else if(msg.content.toLowerCase().startsWith("кии, убери роль")){
        try{
        if(rolesList.indexOf(msg.content.split(" ")[3].toLowerCase())!= -1)
        {
            let role = msg.guild.roles.find(c => c.name.toLowerCase() === msg.content.split(" ")[3].toLowerCase());            
            msg.member.removeRole(role.id);
            msg.reply(`У Вас больше нет роли `+role.name);
        }
        else
            msg.reply("Такая роль не существует, или я не могу её у Вас забрать.");
    }
    catch(e){msg.author.send("Прошу прощения, но я не могу обработать данную команду здесь. Пожалуйста, напишите её в текстовом канале Игрового Сервера Альтерра.")}

    }
    else if(msg.content.toLowerCase().startsWith("кии, роли")){

        msg.channel.send({"embed":{
            title:"",
            color: 0xF1C40F,
            fields:[{
                name: "Вам доступны следующие роли:",
                value: "FAF \nParadox\nWarhammer 40k\nШахматист\nSkyMP\nMount&Blade",
                inline: true
            },
        {
            name: "Команды, которые я знаю:",
            value: "роль 'имя роли' - по этой команде я выдам вам роль, соблюдение регистра необязательно \n\nубери 'имя роли' - по этой команде я сниму с вас ненужную более роль, соблюдение регистра необязательно",
            inline: true
        }]
            
            }});
    }
    else if(msg.content.toLowerCase()=="кии")
    {
        msg.reply("Здравствуйте, "+msg.author.username+". Если вы желаете получить/убрать какую-нибудь роль, введите команду 'КИИ, роли'")
    }
    else if(msg.content.toLowerCase()=="кии, инфо")
    {
        msg.channel.send({"embed":{
            title:"Актуальные мероприятия",
            color: 0xF1C40F,
            fields:[{
                name: "Второй турнир 1v1 Alterra_Soulstorm",
                value: "Организатор - TarvusVarron#9747 \nДата начала - 09.05.2019 \nИгра - Warhammer 40k DoW Soulstorm", 
                inline: true
            }]
            
            }});
    }
    else if(msg.content.toLowerCase().startsWith("кии,")) msg.reply ("Вы ввели некорректную команду")
    });

    client.on('guildMemberAdd', member => {

        member.send("Приветствую Вас, "+member.user.username+", в игровом сообществе "+'"Альтерра"'+". Меня зовут КИИ (Квантовый Искусственный Интеллект), я помогу Вам обсутроиться на нашем сервере. Если Вы хотите узнать подробней актуальную информацию, введите команду "+"КИИ, инфо"+". Если Вы хотите ознакомиться с ролями, и получить их, введите команду "+"КИИ, роли"+". Если у Вас возникли проблемы или вопросы, обращайтесь к администрации сервера. Спасибо за внимание и приятного времяпрепровождения в Альтерре.");
      });

client.login('NTc1OTcxODc1MzIzMzc5NzEy.XOvN8Q.bg88IxS5rR2J5uA53rv-9sF57-E');
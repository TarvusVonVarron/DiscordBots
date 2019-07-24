const Discord = require("discord.js");
const avina = new Discord.Client();
const fs = require('fs')
    
let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));


avina.on('message', message => {
let sender = message.author;
let msg = message.content.toLowerCase();

if(avina.user.id === message.author.id) { return }

if(!userData[sender.username]) userData[sender.username] = {}
if(!userData[sender.username].money) userData[sender.username].money = 1000;
if(!userData[sender.username].userId) userData[sender.username].userId = sender.id;


fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) =>{
    if(err) console.error(err);
})

if(msg.startsWith('кошелёк'))
{
    message.channel.send({"embed":{
title:"Bank",
color: 0xF1C40F,
fields:[{
    name: "Account Holder",
    value: sender.username, 
    inline: true
},
{
    name:"Account Balance",
    value: userData[message.author.username].money,
    inline: true
}]

}});
}

if(msg.startsWith('дай сотку'))
{
    userData[sender.username].money+=100;
    message.channel.send({"embed":{
title:"Кошелёк",
color: 0xF1C40F,
fields:[{
    name: "Владелец",
    value: sender.username, 
    inline: true
},
{
    name: "Добавлено",
    value: '100', 
    inline: true
},
{
    name:"Account Balance",
    value: userData[message.author.username].money,
    inline: true
}]

}});
}

});
var av = "нет";
var mem = false;

avina.on('message', message => {
    if (message.author === avina.user) return;
    if (message.content.toLowerCase().startsWith('авина')) 
    {    
        av = "да";
        message.channel.send('Добрый день, '+message.author.username+', я Авина - ИИ-гид этого комплекса. Если вы хотите получить информацию об интересных местах, введите "достопримечательности". Если вас интересует история и цель существования нашей станции, введите "история"');
  
    }
});

avina.on('message', message => {
    if (message.author === avina.user) return;
    if (message.content.toLowerCase().startsWith('история') && av === "да") 
    {    
        av = false;
        message.channel.send('Захотели и создали');
  
    }
});










avina.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'lab2');
    member.send("Здраститя");
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Милости прошу к нашему шалашу`);
  });

avina.login("NTc1NzQ0MDk1OTczMDE1NTUz.XNaofg.zxalCKr6J7281l8AbRHLIp0NFRQ");
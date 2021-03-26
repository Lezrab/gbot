const Discord = require('discord.js')
const bot = new Discord.Client()

const fetch = require("node-fetch");
const faker = require('faker/locale/fr');

bot.login('NzI4OTcxNDgxMzg3NzYxNzA0.XwCJmA.ENdPYUjhnxCAtm3m_kW9Mo3ZzAQ')
bot.on('ready', () => {
    console.log("je suis prêt")
})

bot.on('message', function(message) {
    if (!message.guild) return;
    if (message.content.startsWith('.gfilm')) {
        var args = message.content.split(' ')
        var key = "dcb156a99d310cd0fc9daf7326b21c61"
        var posterPath = "http://image.tmdb.org/t/p/w185/"
        var search = "";
        if (args.length == 1) {
            message.channel.send("Un film sans titre n'existe pas.")
        } else if (args.length == 2) {
            search = args[1]
        } else if (args.length > 2) {
            for (var i = 1; i < args.length; i++) {
                search += args[i] + "+"
            }
            search = search.substring(0, search.length-1)
        }
        var link = "https://api.themoviedb.org/3/search/movie?api_key="+key+"&query="+search+"&language=fr"
        fetch(link)
        .then(response => response.json())
        .then((out) => {
            if (out === null) {
                message.reply("d")
            } else {
            var posterl = out.results[0].poster_path.replace(/'/g, "")
            var poster = posterPath+posterl
            var desc = out.results[0].overview
            message.reply('Je te conseille **'+out.results[0].title+" !**\n\n\n**Voilà un petit résumé :** \n\n"+desc+"\n\n\n"+poster)
            }
        }).catch((err) => {
            throw err;
        }) 
    } else if (message.content.startsWith(".ggle")) {
        var args = message.content.split(' ');
        if (args.length == 2) {
            message.channel.send("https://google.com/search?q="+args[1])
        } else if (args.length > 2) {
            var url = "https://google.com/search?q="
            for (var i = 1; i <  args.length; i++) {
                url += args[i]+"+"
            }
            url = url.substring(0, url.length-1)
            message.channel.send(url)
        }
    } else if (message.content.startsWith('.gteo')) {
        var apiKey = "bd799733af1342cab31ffbf186f4b890"; 
        var args = message.content.split(' ');
        var city = args[1]
        var link = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&lang=fr";
        fetch(link) 
        .then(res => res.json())
        .then((out) => {
            if (out.cod == 404) {
                message.reply("**Cette ville n'existe pas.**")
            } else if (out.cod != 200 && out.cod != 404) {
                message.reply("**L'API d'OpenWeatherMap ne marche pas :(**")
            } else if (out.cod == 200) {
                message.channel.send('Météo du jour à **'+out.name+'**: \n')
                
                var ciel = ''
                if (out.weather[0].main == 'Thunderstorm') ciel = ':cloud_lightning:'
                else if (out.weather[0].main == 'Drizzle') ciel = ':white_sun_rain_cloud:'
                else if (out.weather[0].main == 'Rain') ciel = ':cloud_rain:'
                else if (out.weather[0].main == 'Snow') ciel = ':cloud_snow:'
                else if (out.weather[0].main == 'Clear') ciel = ':white_sun_small_cloud:'
                else if (out.weather[0].main == 'Clouds') ciel = ':cloud:'
                var temp = Math.round((out.main.temp - 273.15) * 10) / 10;
                var rTemp = Math.round((out.main.feels_like - 273.15) * 10) / 10;
                var wind = Math.round((out.wind.speed * 3.6) * 10) / 10;
                message.channel.send('Voici à peu près le temps qu\'il fait : '+ciel+ciel+ciel)
                message.channel.send('Il fait : **'+temp+'°C**, mais bon, la température ressentie est de : **'+rTemp+'°C** !\n')
                message.channel.send('Ça souffle ! Vitesse du vent : **'+wind+'km/h**\n')
            }
        })
        .catch(err => {
            throw err;
        });
    } else if (message.content === '.gvie') {

        var gender = 'male'
        if (message.author.id == '453926010023575554') gender = 'female'

        var old = 'infant'
        var age = Math.floor(Math.random() * (100 - 1 + 1) + 1) // Age max de 100 ans
        var qi = Math.floor(Math.random() * (120 - 0 + 1 ) + 0) // 120 de QI max quand enfant bas âge
        var point = Math.floor(Math.random() * (37 - 27 + 1) + 27) // 27 - 37 de pointure quand enfant bas âge
        var cm = Math.floor(Math.random() * (8 - 2 + 1) + 2) // 8 cm max quand enfant bas âge
        var mm = Math.floor(Math.random() * (100 - 0 + 1) + 0)
        mm = (Math.round(mm / 10) * 10)
        mm = mm/10
        if (age >= 6 && age < 13) {
            old = 'child'
            qi = Math.floor(Math.random() * (140 - 40 + 1 ) + 40) // 140 - 40 de QI max quand enfant 
            point = Math.floor(Math.random() * (40 - 32 + 1) + 32) // 32 - 40 de pointure quand enfant 
            cm = Math.floor(Math.random() * (14 - 2 + 1) + 2) // 14 cm max quand enfant     
        } else if (age >= 13 && age < 20) {
            old = 'young-adult'
            qi = Math.floor(Math.random() * (170 - 50 + 1 ) + 50) // 170 - 50 de QI max quand jeune adulte
            point = Math.floor(Math.random() * (51 - 35 + 1) + 35) // 35 - 51 de pointure quand jeune adulte
            cm = Math.floor(Math.random() * (28 - 2 + 1) + 2) // 28 cm max quand jeune adulte 
        } else if (age >= 20 && age < 50) {
            old = 'adult'
            qi = Math.floor(Math.random() * (200 - 70 + 1 ) + 70) // 200 - 70 de QI max quand adulte
            point = Math.floor(Math.random() * (51 - 35 + 1) + 35) // 35 - 51 de pointure quand jeune adulte
            cm = Math.floor(Math.random() * (28 - 2 + 1) + 2) // 28 cm max quand jeune adulte  
        } else if (age >= 50 && age < 101) {
            old = 'elderly'
            qi = Math.floor(Math.random() * (200 - 70 + 1 ) + 70) // 200 - 70 de QI max quand adulte
            point = Math.floor(Math.random() * (51 - 35 + 1) + 35) // 35 - 51 de pointure quand jeune adulte
            cm = Math.floor(Math.random() * (28 - 2 + 1) + 2) // 28 cm max quand jeune adulte  
        }

        var key = 'a2nEfTODGl9bnX5PQylGZg'
        var link = `https://api.generated.photos/api/v1/faces?api_key=${key}&gender=${gender}&age=${old}&per_page=100`
        fetch(link) 
        .then(res => res.json()) 
        .then((out) => {
            var name = faker.fake("{{name.firstName}} {{name.lastName}}");
            var adresse = faker.fake('{{address.streetAddress}}, {{address.zipCode}} {{address.city}}')
            var travail = faker.fake('{{name.jobType}}, chez {{company.companyName}}')
            var fn = name.split(" ")[0]; 
            fn = name.substring(0,1)+'. '+name.split(" ")[1];
            if (out.total >= 1) {
            var x = Math.floor(Math.random() * (100 - 0 + 1) + 0)
                if (out.total < 100) {
                    x = Math.floor(Math.random() * (out.total - 0 + 1) + 0)
                }
            var img = out.faces[x].urls[4]["512"]
            var exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('GBOT - Simulateur de vie')
                .setDescription('Ce simulateur de vie va te donner une nouvelle identité !')
                .addField('Paramètres de vie', `**Votre nom : ${fn}, \nVotre adresse : ${adresse}, \nVotre travail : ${travail}, \nVotre âge : ${age} ans, \nVotre QI : ${qi}, \nVotre pointure : ${point}, \nLa taille de votre sexe : ${cm},${mm}cm.**`)
                .addField('Voici une image de vous :', '-')
                .setImage(img)
                .setTimestamp()
            } else if (out.total == 0) {
                var exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('GBOT - Simulateur de vie')
                .setDescription('Ce simulateur de vie va te donner une nouvelle identité !')
                .addField('Paramètres de vie', `**Votre Nom: ${fn}, \nVotre adresse : ${adresse}, \nVotre travail : ${travail}, \nVotre âge : ${age} ans, \nVotre QI : ${qi}, \nVotre pointure : ${point}, \nLa taille de votre sexe : ${cm},${mm}cm.**`)
                .addField('Voici une image de vous', 'Je n\'ai pas réussi à trouver d\'image de vous :(')
                .setTimestamp()
            }

                message.reply(exampleEmbed);
        })
        .catch(err => {
            throw err;
        })
    } else if (message.content.startsWith('.gpurge')) {
        var args = message.content.split(' ')
        var number = args[1]
        message.delete()
        if(isNaN(number)) {
            message.channel.send('Il manque un paramètre.')
        } else if (number <= 100 && number > 0) {
            message.channel.bulkDelete(number)
            .catch(error => message.channel.send(`Error: ${error}`))
        } else if (number < 1 || number > 100) {
            message.channel.send('Je peux seulement supprimer entre 1 et 100 messages !')
        }
    } else if (message.content.includes('vendredi')) {
        if (!message.member.voice.channel) return message.reply("tat uguleeeeee");
    // Checking if the bot is in a voice channel.
    if (message.guild.me.voice.channel) return message.reply("la fermeeeee");

    // Joining the channel and creating a VoiceConnection.
    message.member.voice.channel.join().then(VoiceConnection => {
        // Playing the music, and, on finish, disconnecting the bot.
        VoiceConnection.play("./song/vend.mp3").on("finish", () => VoiceConnection.disconnect());
    }).catch(e => console.log(e))
    }
})

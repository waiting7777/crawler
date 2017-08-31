var request = require('request');
var fs = require('fs')
var JSSoup = require('jssoup').default;
var _ = require('lodash')

var counter = 1021
var request = request.defaults({jar: true})
var data = {}

// var cookie = request.jar()

function run() {

    if(counter > 5000){
        return
    }

    var pad = _.padStart(counter.toString(), 4, '0')
    var target = 'www' + pad + '@msn.com'
    var options = {
        url: 'https://www.newsaward.org/component/users/?view=registration',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
            'Referer': 'https://www.newsaward.org/login'
        }
    };
    console.log('Request https://www.newsaward.org/component/users/?view=registration GET')
    request(options, function(error, res, body){
        var soup = new JSSoup(res.body);
        var test = soup.findAll('input')
        // console.log(test)
        console.log(test.length)
        var the_key = test[10].attrs.name
        data = {
            'jform[name]': target,
            'jform[username]': target,
            'jform[password1]': '123123',
            'jform[password2]': '123123',
            'jform[email1]': target,
            'jform[email2]': target,
            'jform[profile][country]': 'w',
            'jform[profile][phone]': 'w',
            'option': 'com_users',
            'task': 'registration.register',
        }
        data[the_key] = '1'
        options = {
            url: 'https://www.newsaward.org/component/users/?task=registration.register',
            method: 'POST',
            form: data,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
                'Referer': 'https://www.newsaward.org/component/users/?view=registration',
                'Upgrade-Insecure-Requests': '1'
            }
        };
        console.log('Request https://www.newsaward.org/component/users/?task=registration.register POST')
        console.log(data)
        request(options, function(err, res, body){
            // console.log(res)
            console.log('end')
            counter += 1
            setTimeout(run, 60000)
        })
    })
}

run()
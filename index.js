var request = require('request');
var fs = require('fs')
var JSSoup = require('jssoup').default;
var _ = require('lodash')

var counter = 201
var request = request.defaults({jar: true})
var data = {}

function run(){

    if(counter == 220){
        return
    }

    var cookie = request.jar()

    var options = {
        url: 'https://www.newsaward.org/vote?cont=lists&ccname=%E6%88%91%E8%A6%81%E6%8A%95%E7%A5%A8',
        jar: cookie,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
            'Referer': 'https://www.newsaward.org/'
        }
    };
    console.log('Request https://www.newsaward.org/vote?cont=lists&ccname=%E6%88%91%E8%A6%81%E6%8A%95%E7%A5%A8 GET')
    request(options, function(error, res, body){
        // console.log(res.headers)
        options = {
            url: 'https://www.newsaward.org/login',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
                'Referer': 'https://www.newsaward.org/'
            }
        };
        console.log('Request https://www.newsaward.org/login GET')
        request(options, function(error, res, body){
            // console.log(res.headers)

            var soup = new JSSoup(res.body);
            var test = soup.findAll('input')
            // console.log(test[4].attrs)
            // console.log(test[5].attrs)
            // console.log(test[5].attrs.name)
            var the_key = test[5].attrs.name
            var pad = _.padStart(counter.toString(), 4, '0')
            var target = 'www' + pad + '@msn.com'
            data = {
                'username': target,
                'password': '123123',
                'Submit': '',
                'option': 'com_users',
                'task': 'user.login',
                'return': 'aW5kZXgucGhwP0l0ZW1pZD0xMDg=',
            }
            data[the_key] = '1'
            // console.log(data)
            options = {
                url: 'https://www.newsaward.org/login',
                method: 'POST',
                form: data,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
                    'Referer': 'https://www.newsaward.org/login',
                    'Upgrade-Insecure-Requests': '1'
                }
            };
            console.log('Request https://www.newsaward.org/login POST')
            console.log(data)
            request(options, function(err, res, body){
                // console.log(err)
                // console.log(res.headers)
                options = {
                    url: 'https://www.newsaward.org/account',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
                        'Referer': 'https://www.newsaward.org/login',
                        'Upgrade-Insecure-Requests': '1'
                    }
                };
                request(options, function(err, res, body){
                    var soup = new JSSoup(res.body);
                    var test = soup.findAll('input')
                    var the_key = test[4].attrs.name
                    data = {
                        'logout': '登出',
                        'option': 'com_users',
                        'task': 'user.logout',
                        'return': 'aW5kZXgucGhwP0l0ZW1pZD0xMDc=',
                    }
                    data[the_key] = '1'
                    
                    options = {
                        url: 'https://www.newsaward.org/vote?cont=lists&ccname=%E6%88%91%E8%A6%81%E6%8A%95%E7%A5%A8',
                        method: 'POST',
                        form: {
                            vote_cmd : 'WyIxODQiLCJ3b3JrIiwibWVkaWEiXQ'
                        },
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
                            'Referer': 'https://www.newsaward.org/vote?cont=lists&ccname=%E6%88%91%E8%A6%81%E6%8A%95%E7%A5%A8',
                            'Upgrade-Insecure-Requests': '1'
                        }
                    };
                    console.log('Request https://www.newsaward.org/vote?cont=lists&ccname=%E6%88%91%E8%A6%81%E6%8A%95%E7%A5%A8 POST')
                    request(options, function(err, res, body){
                        console.log('Request https://www.newsaward.org/vote?cont=lists&ccname=%E6%88%91%E8%A6%81%E6%8A%95%E7%A5%A8 POST')
                        request(options, function(err, res, body){
                            console.log('Request https://www.newsaward.org/vote?cont=lists&ccname=%E6%88%91%E8%A6%81%E6%8A%95%E7%A5%A8 POST')
                            request(options, function(err, res, body){
                                options = {
                                    url: 'https://www.newsaward.org/account',
                                    method: 'POST',
                                    form: data,
                                    headers: {
                                        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
                                        'Referer': 'https://www.newsaward.org/vote?cont=lists&ccname=%E6%88%91%E8%A6%81%E6%8A%95%E7%A5%A8',
                                        'Upgrade-Insecure-Requests': '1'
                                    }
                                };
                                console.log('Request https://www.newsaward.org/account POST')
                                console.log(data)
                                request(options, function(err, res, body){
                                    counter += 1
                                    console.log('end')
                                })
                            })
                        })
                    })
                })
                
            })
        })
        // console.log(body)
    })

    setTimeout(run, 180000)

}

run()
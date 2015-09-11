var twitchUsers =
    ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "medrybw"];

var baseUrl = 'https://api.twitch.tv/kraken/streams/';

for (var i = 0; i < twitchUsers.length; i++)
{
    $.getJSON(baseUrl + twitchUsers[i], function(resp)
    {
        if (resp.stream === null)
        {
            console.log(resp._links.channel + ' is offline');
        }
        else
        {
            console.log('Playing ' + resp.stream.game);
            console.log(resp.stream.channel.name + " is online");
        }
    })
}

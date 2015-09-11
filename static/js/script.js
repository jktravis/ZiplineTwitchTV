$(document).ready(function()
{

var twitchUsers =
    ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "medrybw"];

var streamUrl = 'https://api.twitch.tv/kraken/streams/';
var channelUrl = 'https://api.twitch.tv/kraken/channels/';
var $statusList = $('#status-list');

$statusList.empty();

for (var i = 0; i < twitchUsers.length; i++)
{
    $.getJSON(channelUrl + twitchUsers[i], function(resp)
    {
        $statusList.append('<li><a href="' + resp.url + '"><img src="' + resp.logo + '" class="img-thumbnail img-circle"/> ' + resp.display_name + '</a></li>');
    })
}

//for (i = 0; i < twitchUsers.length; i++)
//{
//    $.getJSON(streamUrl + twitchUsers[i], function(resp)
//    {
//        if (resp.stream === null)
//        {
//            console.log(resp._links.channel + ' is offline');
//        }
//        else
//        {
//            console.log('Playing ' + resp.stream.game);
//            console.log(resp.stream.channel.name + " is online");
//        }
//    })
//}
});

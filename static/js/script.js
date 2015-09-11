$(document).ready(function()
{

    var twitchUsers =
        ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "medrybw"];

    var streamUrl = 'https://api.twitch.tv/kraken/streams/';
    var channelUrl = 'https://api.twitch.tv/kraken/channels/';
    var $statusList = $('#status-list');
    var listTemplate = '<li><a href="$URL"><img src="$IMG" class="img-thumbnail img-circle"/> $DISPLAY_NAME</a></li>';
    var currentListItem;
    $statusList.empty();

    for (var i = 0; i < twitchUsers.length; i++)
    {
        $.getJSON(channelUrl + twitchUsers[i], function (resp)
        {
             resp.logo = resp.logo === null? 'http://lorempixel.com/60/60/' : resp.logo;
            currentListItem = listTemplate.replace('$URL', resp.url).replace('$IMG', resp.logo).replace('$DISPLAY_NAME', resp.display_name);
            $statusList.append(currentListItem);
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

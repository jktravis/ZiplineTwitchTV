$(document).ready(function()
{

    var twitchUsers =
        ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "medrybw"];

    var streamUrl = 'https://api.twitch.tv/kraken/streams/';
    var channelUrl = 'https://api.twitch.tv/kraken/channels/';
    var $statusList = $('#status-list');
    var listTemplate = '<li><a href="$URL"><img src="$IMG" class="img-thumbnail img-circle"/> $DISPLAY_NAME' +
        '<span class="glyphicon glyphicon-$STATUS">$PLAYING</span></a>' +
        '</li>';
    var currentListItem;
    $statusList.empty();

    for (var i = 0; i < twitchUsers.length; i++)
    {
        $.when($.getJSON(channelUrl + twitchUsers[i]), $.getJSON(streamUrl + twitchUsers[i])).done(function (user, stream)
        {
            console.log(user[0].name);
            console.log(stream[0]);
            user[0].logo = user[0].logo === null ? 'http://lorempixel.com/60/60/' : user[0].logo;
            currentListItem = listTemplate.replace('$URL', user[0].url).replace('$IMG', user[0].logo).replace('$DISPLAY_NAME', user[0].display_name);
            if (stream[0].stream === null)
            {
                currentListItem = currentListItem.replace('$STATUS', 'pause').replace('$PLAYING', 'Offline');
            }
            else
            {
                currentListItem = currentListItem.replace('$STATUS', 'play').replace('$PLAYING', stream[0].stream.game);
            }
            $statusList.append(currentListItem);
        });
    }
});

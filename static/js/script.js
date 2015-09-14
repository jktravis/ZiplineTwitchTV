$(document).ready(function()
{
    var twitchUsers =
        ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "medrybw", "comster404", "brunofin"];

    var streamUrl = 'https://api.twitch.tv/kraken/streams/';
    var channelUrl = 'https://api.twitch.tv/kraken/channels/';
    var $statusList = $('#status-list');

    var listTemplate = '<li> <a href="$URL"><img src="$IMG" class="img-thumbnail img-circle"/> <span class="diplay-name">' +
        '$DISPLAY_NAME</span> <span class="status-icon glyphicon glyphicon-$STATUS"></span> <span class="activity">$PLAYING</span> </a> </li>';
    var currentListItem;
    var $navli = $('.nav > li');


    $navli.click(function(e)
    {
        e.preventDefault();
        $navli.removeClass('active');
        $(this).addClass('active');

        populateTwitchList(twitchUsers, $(this).find('a').text());
    });

    $('#filter').on('keyup', function()
    {
        var $this = $(this);
        var filteredArray = twitchUsers.filter(function(val, index, arr)
        {
            console.log('val.toLowerCase(): ' + val.toLowerCase());
            console.log('$this.val().toLowerCase: ' + $this.val().toLowerCase());
            return (val.toLowerCase().indexOf($this.val().toLowerCase()) > -1);
        });

        console.log(filteredArray);

        populateTwitchList(filteredArray, $('.active').find('a').text());
    });

    function populateTwitchList(arr, listType)
    {
        $statusList.empty();

        for (var i = 0; i < arr.length; i++)
        {
            $.when($.getJSON(channelUrl + arr[i]), $.getJSON(streamUrl + arr[i])).done(function (user, stream)
            {
                user[0].logo = user[0].logo === null ? 'http://lorempixel.com/60/60/' : user[0].logo;
                currentListItem = listTemplate.replace('$URL', user[0].url).replace('$IMG', user[0].logo)
                    .replace('$DISPLAY_NAME', user[0].display_name);

                if (stream[0].stream === null)
                {
                    currentListItem = currentListItem.replace('$STATUS', 'pause').replace('$PLAYING', 'Offline');
                }
                else
                {
                    currentListItem = currentListItem.replace('$STATUS', 'play').replace('$PLAYING', stream[0].stream.game);
                }

                if (listType === 'Online')
                {
                    if (stream[0].stream !== null)
                    {
                        $statusList.append(currentListItem);
                    }
                }
                else if (listType === 'Offline')
                {
                    if (stream[0].stream === null)
                    {
                        $statusList.append(currentListItem);
                    }
                }
                else
                {
                    $statusList.append(currentListItem);
                }


            }).fail(function(err)
            {
                var resp = $.parseJSON(err.responseText);
                $statusList.append('<li>' + resp.message + '</li>');
            });
        }
    }

    populateTwitchList(twitchUsers, $('.active').find('a').text());
});

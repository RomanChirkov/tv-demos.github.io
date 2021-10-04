async function post(url, api_key, payload) {
    let result;

    try {
        result = await $.ajax({
            url: url,
            type: 'POST',
            headers: { 'x-api-key': api_key, 'content-type': 'application/json' },
            data: JSON.stringify(payload)
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}

async function call_api() {
  let url = "https://m.api.lura.app/play/v1/media/session";
  let api_key = "hyD9ACaFYe3hpyWWRuOPzkjgrkwX6aFOLIPmpZfeyqn4oirAUybejNkXRhZes23DnIJx77RKmtswSqpIWpQGVO";
  let data = {
    "ad_url": "https://storage.googleapis.com/m300732-mcp-media/vast3.xml",
    "manifest_url": "mcp://channel/1477/manifest.m3u8",
    "fields": ["timeline", "tracking"],
    "developer_options": {
      "enabled": true,
      "adops_id": "Qtge28wiFFgCsLq5"
    }
  };

  let result = await post ( url, api_key, data );
  if ( result && result.session_id) {
    return result;
  } else {
    return null;
  }
}

async function load_player() {
  let start = Date.now();
  let api_response = await call_api();
  console.log(Date.now() - start, api_response);

  if ( !api_response.stitched_url ) {
    console.log("Response", api_response);
    $('#messages').text("Cannot access this content. Check your authorization settings.");
    return;
  }

AnvatoPlayer("playerLIVE1").init({
    url: api_response.stitched_url,
    width: "90%",
    poster: 'https://imagecomposer.nfl.com/?l=https://static.nfl.com/static/content/public/static/mobile/apps/nfl/misc/inline-video-player.jpg&w=800&c=140',
    title: "Sim - Green Bay Packers at San Francisco 49ers", 
});

AnvatoPlayer("playerLIVE2").init({
    url: api_response.stitched_url,
    width: "90%",
    poster: 'https://imagecomposer.nfl.com/?l=https://static.nfl.com/static/content/public/static/mobile/apps/nfl/misc/inline-video-player.jpg&w=800&c=140',
    title: "Sim - Green Bay Packers at San Francisco 49ers", 
    plugins: {
        dfp: {
            clientSide: {
                adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=vmap&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ar%3Dpremidpostpod&cmsid=496&vid=short_onecue&correlator=',
            },
        },
    }
});
}

load_player();
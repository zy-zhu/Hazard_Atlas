$(document).ready(function()
{
  if(!Detector.webgl)
  {
    $('#noWebGL').css('visibility', 'visible');
    $('body').css('background', '#000000');
  } else
  {
    var colors = [0x00ff00, 0x0066ff, 0xe20800, 0xffdd00, 0];
    var globe = DAT.Globe($('#container')[0], function(label)
    {
      return new THREE.Color(colors[label]);
    });

    $('.sport').show();

    $('.sport').each(function(i)
    {
      var htmlcolor = colors[i].toString(16);
      htmlcolor = '000000'.substr(0, 6 - htmlcolor.length) + htmlcolor;
      $(this).css('border-left', '20px solid #'+htmlcolor);
      if (i < 4)
      {
        $(this).click(function()
        {
          displayData(i+1);ƒ
          $('.sport').removeClass('active');
          $(this).addClass('active');
        });
      }
    });

    $('#sAll').click(function()
    {
      displayData(false);
      $('.sport').removeClass('active');
    })

    function displayData(label)
    {
      globe.resetData();
      globe.addData(window.data, {format: 'legend', showLabel: label});
      globe.createPoints();
    }

    $.ajax({
      url: 'data.json',
      dataType: 'json',
      data: {},
      cache: false,
      success: function(data)
      {
        window.data = data;
        displayData(false);
        globe.animate();
        $('#sAll').html('Show all workouts ('+(data.length/4)+')');
      },
      error: function(jqXHR, textStatus, errorThrown)
      {
        alert('Error downloading data: '+textStatus);
      }
    });
  }
});
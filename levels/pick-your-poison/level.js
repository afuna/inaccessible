var levelData = {
    title: "Pick Your Poison",
    flavorText: "You have many vials in front of you. The red vials are poison. The green vial is a magic potion which will let you move on. You can't tell the difference between the two.",
    code: "",
    codeType: "css",
    onLevelStart: function(game) {
        function generateColor(color) {
            var base_h, base_s, base_l;
            if (color === "red") {
                base_h = 0;
                base_s = 70;
                base_l = 60;
            } else if (color === "green") {
                base_h = 120;
                base_s = 40;
                base_l = 40;
            }

            var h = Math.floor(Math.random() * 5) + base_h;
            var s = Math.floor(Math.random() * 5) + base_s;
            var l = Math.floor(Math.random() * 5) + base_l;
            return "hsl(" + h + ", " + s + "%, " + l + "%)";
        }

        function generateVials() {
            var vials = [];
            var vialStyles = [];
            function placeVial(type, color) {
                var vialWidth = 50;
                var vialHeight = 30;

                var x = Math.floor(Math.random() * (game.getWidth() - vialWidth));
                var y = Math.floor(Math.random() * (game.getHeight() - vialHeight));

                var vialId = vials.length;
                vials.push("<button class='vial vial-" + vialId + " " + type + "' style='" +
                                        "width:"  + vialWidth + "px;" +
                                        "height:" + vialHeight + "px;" +
                                        "left:" + x + "px;" +
                                        "top:"  + y +"px;" +
                                    "'>p</button>");

                var prefix = (type === "potion") ? "!" : " ";
                vialStyles.push(prefix + "#puzzlePane .vial-" + vialId + " { background-color: " + color + " }");
            }

            // populate
            for (var i = 0; i < 20; i++) {
                placeVial("poison", generateColor("red"));
            }
            placeVial("potion", generateColor("green"));
            game.updateEditor(vialStyles.join("\n"));
            game.updatePuzzlePane(vials.join("\n"));

            $(".poison").click(function() {
                game.updateFlavorText("Sorry, the poison got you. You open your eyes and see many vials in front of you. Red vials are poison, green will get you out. You can't tell the difference between them.");
                generateVials();
            });
            $(".potion").click(game.win.bind(game));
        }

        generateVials();
    },
    onEditorUpdate: function(game) {
        function getFilteredColor(color) {
            return color.replace(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, function() {
                var simulatedColors = color_blind_sims(
                        parseInt(RegExp.$1, 10),
                        parseInt(RegExp.$2, 10),
                        parseInt(RegExp.$3, 10));
                return '#' + simulatedColors.deutan;
            })
        }

        function applyFilter() {
            $(".vial")
                // remove inline calculated color
                .css("backgroundColor", "")
                // apply filter to color coming from the stylesheet
                .css("backgroundColor", function(index, color) { return getFilteredColor(color); });
        }

        // a little hack to make sure that we only request the background color after the per-vial style has been applied
        // (safari/chrome will often use the original gray background color on the first load of the page)
        window.requestAnimationFrame(applyFilter);
    }
};

/* The code below is taken from the Color Laborotary engine.js file
 * available from http://colorlab.wickline.org/colorblind/colorlab/docs/legal.html
 */

function dec_to_hex( dec ) {
    // decimal color level to hexidecimal
    if ( dec <= 0 ) {
        return "00";
    } else if ( dec >= 255 ) {
        return "FF";
    }
    var result = parseInt(dec).toString(16).toUpperCase();
    if ( result.length == 1 ) {
        return( "0" + result );
    }
    return result;
}
function Color() { // object constructor
  // a convenient way to access color coordinates in a
  // variety of color spaces, and to translate between two
  this.rgb_from_xyz = Color_rgb_from_xyz;
  this.xyz_from_rgb = Color_xyz_from_rgb;
}

function Color_xyz_from_rgb() { // object method
  // values are not as precise as possible (see below) ...
  this.x = ( 0.4306*this.r + 0.3416*this.g + 0.1783*this.b );
  this.y = ( 0.2220*this.r + 0.7067*this.g + 0.0713*this.b );
  this.z = ( 0.0202*this.r + 0.1296*this.g + 0.9392*this.b );
  return this;
  /* I sacrificed a bit of precision...
     original values from TW's source: (java and excel were identical)
     this.x = ( 0.430574*this.r + 0.341550*this.g + 0.178325*this.b );
     this.y = ( 0.222015*this.r + 0.706655*this.g + 0.071330*this.b );
     this.z = ( 0.020183*this.r + 0.129553*this.g + 0.939180*this.b );
  */
}
function Color_rgb_from_xyz() { // object method
  // values are not as precise as possible (see below) ...
  this.r = (  3.0632*this.x - 1.3933*this.y - 0.4758*this.z );
  this.g = ( -0.9692*this.x + 1.8760*this.y + 0.0416*this.z );
  this.b = (  0.0679*this.x - 0.2289*this.y + 1.0693*this.z );
  return this;
  /* I sacrificed a bit of precision...
     original values from TW's java source:
     this.r = (  3.063218*this.x - 1.393325*this.y - 0.475802*this.z );
     this.g = ( -0.969243*this.x + 1.875966*this.y + 0.041555*this.z );
     this.b = (  0.067871*this.x - 0.228834*this.y + 1.069251*this.z );
     original values from TW's excel source:
     this.r = (  3.063219*this.x - 1.393325*this.y - 0.475802*this.z );
     this.g = ( -0.969245*this.x + 1.875968*this.y + 0.041555*this.z );
     this.b = (  0.067872*this.x - 0.228834*this.y + 1.069251*this.z );
  */
}

var gamma = 2.2;
// white point xyz coords:
var wx =  0.312713;  var wy = 0.329016;  var wz = 0.358271;
var blind = new Object();
blind.protan = new Object();
    blind.protan.cpu = 0.735; // confusion point, u coord
    blind.protan.cpv = 0.265; // confusion point, v coord
    blind.protan.abu = 0.115807; // color axis begining point (473nm), u coord
    blind.protan.abv = 0.073581; // color axis begining point (473nm), v coord
    blind.protan.aeu = 0.471899; // color axis ending point (574nm), u coord
    blind.protan.aev = 0.527051; // color axis ending point (574nm), v coord
blind.deutan = new Object();
    blind.deutan.cpu =  1.14; // confusion point, u coord
    blind.deutan.cpv = -0.14; // confusion point, v coord
    blind.deutan.abu = 0.102776; // color axis begining point (477nm), u coord
    blind.deutan.abv = 0.102864; // color axis begining point (477nm), v coord
    blind.deutan.aeu = 0.505845; // color axis ending point (579nm), u coord
    blind.deutan.aev = 0.493211; // color axis ending point (579nm), v coord
blind.tritan = new Object();
    blind.tritan.cpu =  0.171; // confusion point, u coord
    blind.tritan.cpv = -0.003; // confusion point, v coord
    blind.tritan.abu = 0.045391; // color axis begining point (490nm), u coord
    blind.tritan.abv = 0.294976; // color axis begining point (490nm), v coord
    blind.tritan.aeu = 0.665764; // color axis ending point (610nm), u coord
    blind.tritan.aev = 0.334011; // color axis ending point (610nm), v coord
var t; // type of color blindness
for ( t in blind ) {
    // slope of the color axis:
    blind[t].am = (
        ( blind[t].aev - blind[t].abv )
        /
        ( blind[t].aeu - blind[t].abu )
    );
    // "y-intercept" of axis (actually on the "v" axis at u=0)
    blind[t].ayi = blind[t].abv  -  blind[t].abu * blind[t].am;
}
/*

    The color_blind_sims() JavaScript function in the is
    copyright (c) 2000-2001 by Matthew Wickline and the
    Human-Computer Interaction Resource Network ( http://hcirn.com/ ).

    The color_blind_sims() function is used with the permission of
    Matthew Wickline and HCIRN, and is freely available for non-commercial
    use. For commercial use, please contact the
    Human-Computer Interaction Resource Network ( http://hcirn.com/ ).
    (This notice constitutes permission for commercial use from Matthew
    Wickline, but you must also have permission from HCIRN.)
    Note that use of the color laboratory hosted at aware.hwg.org does
    not constitute commercial use of the <code>color_blind_sims()</code>
    function. However, use or packaging of that function (or a derivative
    body of code) in a for-profit piece or collection of software, or text,
    or any other for-profit work <em>shall</em> constitute commercial use.

*/
function color_blind_sims( r,g,b ) {
    // return colorblind versions of color
    // takes 0..255 rgb values (not validated!)
    // returns hash of rrggbb values
    //
    // map RGB input into XYZ space...
    var c = new Color;
    c.r = Math.pow( r/255, gamma );
    c.g = Math.pow( g/255, gamma );
    c.b = Math.pow( b/255, gamma );
    c.xyz_from_rgb();
    var sum_xyz = c.x + c.y + c.z;
    // map into uvY space...
    c.u = 0;  c.v = 0;
    if ( sum_xyz != 0 ) {
        c.u = c.x / sum_xyz;
        c.v = c.y / sum_xyz;
    }
    // find neutral grey at this luminosity (we keep the same Y value)
    var nx = wx * c.y / wy;
    var nz = wz * c.y / wy;
    var sim = new Object(); // simulations results will be stored here
    // the following variables will be recycled within the for loop...
    // (these variables will be described as they get used)
    var clm;  var clyi;
    var s = new Color();  var d = new Color();
    var adjust;  var adjr;  var adjg;  var adjb;
    d.y = 0; // we're always at the same Y value, so delta Y is zero
    for ( t in blind ) { // for each type of color blindness...
        // cl is "confusion line" between our color and the confusion point
        // clm is cl's slope, and clyi is cl's "y-intercept" (actually on the "v" axis at u=0)
        if ( c.u < blind[t].cpu ) {
            clm = (blind[t].cpv - c.v) / (blind[t].cpu - c.u);
        } else {
            clm = (c.v - blind[t].cpv) / (c.u - blind[t].cpu);
        }
        //clm = (  (c.u < blind[t].cpu)
        //    ? (  (blind[t].cpv - c.v) / (blind[t].cpu - c.u)  )
        //    : (  (c.v - blind[t].cpv) / (c.u - blind[t].cpu)  )
        //);
        clyi = c.v -  c.u * clm;
        // find the change in the u and v dimensions (no Y change)
        d.u = (blind[t].ayi - clyi) / (clm - blind[t].am);
        d.v = (clm * d.u) + clyi;
        // find the simulated color's XYZ coords
        s.x = d.u * c.y / d.v;
        s.y = c.y;
        s.z = ( 1 - (d.u+d.v) ) * c.y / d.v;
        s.rgb_from_xyz(); // and then try to plot the RGB coords
        // note the RGB differences between sim color and our neutral color
        d.x = nx - s.x;
        d.z = nz - s.z;
        d.rgb_from_xyz();
        // find out how much to shift sim color toward neutral to fit in RGB space:
        adjr = d.r  ?  ( (s.r<0 ? 0 : 1) - s.r ) / d.r  :  0;
        adjg = d.g  ?  ( (s.g<0 ? 0 : 1) - s.g ) / d.g  :  0;
        adjb = d.b  ?  ( (s.b<0 ? 0 : 1) - s.b ) / d.b  :  0;
        adjust = Math.max(
            (  ( adjr>1 || adjr<0 )   ?   0   :   adjr  ),
            (  ( adjg>1 || adjg<0 )   ?   0   :   adjg  ),
            (  ( adjb>1 || adjb<0 )   ?   0   :   adjb  )
        );
        // now shift *all* three proportional to the greatest shift...
        s.r = s.r + ( adjust * d.r );
        s.g = s.g + ( adjust * d.g );
        s.b = s.b + ( adjust * d.b );
        // and then save the resulting simulated color...
        sim[t] = (
            dec_to_hex(
                255*(
                    s.r <= 0  ?  0  :
                    s.r >= 1  ?  1  :
                    Math.pow( s.r, 1/gamma )
                )
            )+dec_to_hex(
                255*(
                    s.g <= 0  ?  0  :
                    s.g >= 1  ?  1  :
                    Math.pow( s.g, 1/gamma )
                )
            )+dec_to_hex(
                255*(
                    s.b <= 0  ?  0  :
                    s.b >= 1  ?  1  :
                    Math.pow( s.b, 1/gamma )
                )
            )
        );
    }
    return sim; // return all simulated versions at once
}

module.exports = function() {

    var jsonToSbgnml, elementUtilities, cy;
  
    function sbmlToSbgnml(param) {
      jsonToSbgnml = param.jsonToSbgnmlConverter;
      elementUtilities = param.elementUtilities;
      cy = param.sbgnCyInstance.getCy();
    }
  
 
    sbmlToSbgnml.convert = function (xml, callback) {
        var login = "login=anonymous&password=";
        var url1 = "https://minerva-dev.lcsb.uni.lu/minerva/api/doLogin";
        var url2 = "https://minerva-dev.lcsb.uni.lu/minerva/api/convert/SBML:SBGN-ML";
        var myToken = "MINERVA_AUTH_TOKEN=";
       
         $.ajax({
          type: 'post',
          url: "/utilities/ServerRequest",
          data: { address: url1, param: JSON.stringify(login), postType: "auth" },
          success: function (data) {
            taken = data.response.headers["set-cookie"][1];
            var cookieArray = taken.split(';');
            myToken += cookieArray[0].split('=')[1];
            
            $.ajax({
              type: 'post',
              url: "/utilities/ServerRequest",
              headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
              data: { url: url2, file: xml, token: myToken, postType: "sendData" },
              success: function (data) {
                  callback(data.response);             
              },
                error:function (error) {
                  callback(null);
                }
            })
          },
          error: function(error){
              callback(null);
          }
        })
        
    }

    return sbmlToSbgnml;
  
  }
  

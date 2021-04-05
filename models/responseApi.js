/**
 * @desc This  file contains success and error response for sending to client/ user
 * @author Dayo Michael
 * @since 2021
 */

 /**
  * @desc Send any success response
  * @param {string} message
  * @param {object | array |string} data
  * @param {number} statusCode
  */

  export const success = (message,data, statusCode) => {
    return{
        status:"success",
        message,
        error: false,
        code: statusCode,
        data
    };
  };

  /**
   * @desc Send any error response
   * 
   * @param {string} message
   * @param {number} statusCode
   */

   export const error =(message,statusCode) => {
       const codes = [200, 201, 400, 401, 403, 404, 422, 500];
       //Get matched code
       const findCode = codes.find((code) => code == statusCode);
       if (!findCode) statusCode = 500;
       else statusCode = findCode;

       return {
           status:"failed",
           message,
           code: statusCode,
           error: true
       };
    };

    
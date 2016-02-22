/**
 * Created by abhinav on 1/28/2016.
 */
var Constants=require('./Config'),
    errorMessages=Constants.responseMessages.ERROR_MESSAGES,
    successMessages=Constants.responseMessages.SUCCESS_MESSAGES;


var createErrorResponseMessage=function(err){
    var error={
        response:{
            message:errorMessages.SOMETHING_WRONG,
            data:""
        },
        statusCode:400
    };
    if(err.code===11000) {
        error.response.message=errorMessages.USERNAME_OR_EMAIL_TAKEN;
    }
    else
        switch(err.message)
        {
            case errorMessages.USER_NOT_VERIFIED:error.response.message = errorMessages.USER_NOT_VERIFIED;
                error.statusCode=401;
                break;
            case errorMessages.INVALID_TOKEN:error.response.message = errorMessages.INVALID_TOKEN;
                error.statusCode=401;
                break;
            case errorMessages.INVALID_ID:error.response.message = errorMessages.INVALID_ID;
                error.statusCode=401;
                break;
            case errorMessages.ACTION_NO_AUTH:error.response.message = errorMessages.ACTION_NO_AUTH;
                error.statusCode=401;
                break;
            case errorMessages.ALREADY_FOLLOWED:error.response.message = errorMessages.ALREADY_FOLLOWED;
                break;
            case errorMessages.ALREADY_NOT_FOLLOWED:error.response.message = errorMessages.ALREADY_NOT_FOLLOWED;
                break;
            case errorMessages.INVALID_CREDENTIALS:error.response.message = errorMessages.INVALID_CREDENTIALS;
                error.statusCode=401;
                break;
            case errorMessages.IMAGE_FORMAT_NOT_SUPPORTED:error.response.message = errorMessages.IMAGE_FORMAT_NOT_SUPPORTED;
                error.statusCode=400;
                break;
            default:error.response.message =errorMessages.SOMETHING_WRONG;
                break;
        }
    return error;
};


var createSuccessResponseMessage=function(route,result){
    var success={
        response:{
            message:successMessages.ACTION_COMPLETE,
            data:result
        },
        statusCode:200
    };
    switch(route){
        case successMessages.REGISTRATION_SUCCESSFUL:success.response.message=successMessages.REGISTRATION_SUCCESSFUL+successMessages.EMAIL_SENT;
            success.statusCode=201;
            break;
        case successMessages.LOGIN_SUCCESSFULLY: success.response.message=successMessages.LOGIN_SUCCESSFULLY;
            break;
        case successMessages.EMAIL_VERIFIED:success.response.message=successMessages.EMAIL_VERIFIED;
            break;
        case successMessages.ACTION_COMPLETE:success.response.message=successMessages.ACTION_COMPLETE;
            success.statusCode=201;
            break;
        case successMessages.LOGOUT_SUCCESSFULLY:success.response.message=successMessages.LOGOUT_SUCCESSFULLY;
            break;
        default:success.response.message=successMessages.ACTION_COMPLETE;
            break;

    }
    return success;
};
module.exports={
    createErrorResponseMessage:createErrorResponseMessage,
    createSuccessResponseMessage:createSuccessResponseMessage};

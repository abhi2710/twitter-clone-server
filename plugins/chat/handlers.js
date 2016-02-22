/**
 * Created by abhi1027 on 10/2/16.
 */
exports.hello = function () {
    this.emit('Hi back at you');
};

exports.newMessage = function (newMessage) {
    console.log('Got message', newMessage);
};

exports.goodbye = function () {
    this.emit('Take it easy, pal');
};
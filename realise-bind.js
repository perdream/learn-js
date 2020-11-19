Function.prototype.bind2 = function(context) {
    if (typeof this !== "function") {
        throw new Error(
            "Function.prototype.bind - what is trying to be bound is not callable"
        );
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function() {};

    var fBound = function() {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(
            this instanceof fNOP ? this : context,
            args.concat(bindArgs)
        );
    };
    //这里需要一个寄生组合继承
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
};
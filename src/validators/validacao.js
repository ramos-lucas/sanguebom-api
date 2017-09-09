let errors = [];

function Validacao() {
    errors = [];
}

Validacao.prototype.isRequired = (value, message) => {
    if (!value || value.length <= 0)
        errors.push({ message: message });
}

Validacao.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.length < min)
        errors.push({ message: message });
}

Validacao.prototype.hasMaxLen = (value, max, message) => {
    if (!value || value.length > max)
        errors.push({ message: message });
}

Validacao.prototype.isFixedLen = (value, len, message) => {
    if (value.length != len)
        errors.push({ message: message });
}

Validacao.prototype.isEmail = (value, message) => {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value))
        errors.push({ message: message });
}

Validacao.prototype.usernameFormat = (value, message) => {
    var reg = new RegExp(/^(?:[a-zA-Z0-9]|([_])(?!\1)){5,20}$/);
    if (!reg.test(value))
        errors.push({ message: message });
}

Validacao.prototype.errors = () => { 
    return errors; 
}

Validacao.prototype.clear = () => {
    errors = [];
}

Validacao.prototype.isValid = () => {
    return errors.length == 0;
}

module.exports = Validacao;
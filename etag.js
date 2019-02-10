var $e = function (tag, content) {
    let reParse = (re, str) => { let m = re.exec(str); return m && m.length > 0 ? m[1] : undefined; };
    let parseName = (input) => { return reParse(/^([a-zA-Z0-9]+?)($|\#|\s|\n|\.)/, input); };
    let parseId = (input) =>  { return reParse(/^\S+?\#(\S+?)[\.\s$]/, input); };
    let parseClass = (input) => { return reParse(/[\S\s\-]+?\.([\S\-]+?)(\s|\#|$)/, input); };
    let parseAttributes = (input) => {
        var attrre = /\s(\S+=".*?")/g;
        var attrm = attrre.exec(input);
        var keyValuePairs = [];
        while (attrm != null) {
            var tokens = attrm[1].split('=');
            if ((tokens[1][0] == '\'' && tokens[1][tokens[1].length - 1] == '\'') ||
                (tokens[1][0] == '"' && tokens[1][tokens[1].length - 1] == '"')) {
                tokens[1] = tokens[1].substring(1, tokens[1].length - 1);
            }
            keyValuePairs.push({ key: tokens[0], value: tokens[1] });
            attrm = attrre.exec(input);
            if (attrre.lastIndex < 0) {
                break;
            }
        }
        return keyValuePairs;
    };
    let parseTag = (input) => {
        return {
            name: parseName(input),
            id: parseId(input),
            className: parseClass(input),
            attributes: parseAttributes(input)
        };
    };
    let parseStack = (input) => {
        let stackedre = /^(\S+(\s*\>\s*\S+)+)/;
        let stackedm = stackedre.exec(input);
        let stack = [];
        if (stackedm != null) {
            var tokens = stackedm[1].split('>');
            tokens.forEach(x => { stack.push(parseTag(x.trim())); });
        } else {
            stack.push(parseTag(input));
        }
        return stack;
    };
    let addContentItem = (target, content) => {
        let _asNode = (_target, _content) => {
            if (typeof _content === 'object' && _content.nodeName) {
                return _content;
            }
            else {
                if (_target.tagName === 'UL' || _target.tagName === 'OL') {
                    return $e('li', _content);
                }
                else if (_target.tagName === 'select') {
                    return $e('option', _content);
                }
                return document.createTextNode(_content);
            }
        }
        if (content !== undefined) {
            if (Array.isArray(content)) {
                content.forEach(item => addContentItem(target, item));
            }
            else {
                target.appendChild(_asNode(target, content));
            }
        }
        return target;
    };

    var stack = parseStack(tag);

    if (arguments.length > 2) {
        content = [].slice.apply(arguments).slice(1);
    }

    let _e;
    while (stack.length) {
        var tag = stack.pop();
        _e = document.createElement(tag.name);
        if (tag.id) { _e.setAttribute('id', id); }
        if (tag.className) { _e.setAttribute('class', tag.className.split('.').join(' ')); }
        tag.attributes.forEach(attr => _e.setAttribute(attr.key, attr.value));
        content = addContentItem(_e, content);
    }
    return _e;
};

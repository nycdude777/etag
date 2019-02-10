
var $e = function (tag, content) {
    var parseName = function (input) {
        var m = /^([a-zA-Z0-9]+?)($|\#|\s|\n|\.)/.exec(input);
        var result;
        if (m && m.length > 0) {
            result = m[1];
        }
        else {
            result = undefined;
        }
        return result;
    };
    var parseId = function (input) {
        var m = /^\S+?\#(\S+?)[\.\s$]/.exec(input);
        var result;
        if (m && m.length > 0) {
            result = m[1];
        }
        else {
            result = undefined;
        }
        return result;
    };
    var parseClass = function (input) {
        var m = /[\S\s\-]+?\.([\S\-]+?)(\s|\#|$)/.exec(input);
        var result;
        if (m && m.length > 0) {
            result = m[1];
        }
        else {
            result = undefined;
        }
        return result;
    };
    var parseAttributes = function (input) {
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
    }
    var parseTag = function (input) {
        return {
            name: parseName(input),
            id: parseId(input),
            className: parseClass(input),
            attributes: parseAttributes(input)
        };
    }
    var parseStack = function (input) {
        var stackedre = /^(\S+(\s*\>\s*\S+)+)/;
        var stackedm = stackedre.exec(input);
        var stack = [];
        if (stackedm != null) {
            var tokens = stackedm[1].split('>');
            tokens.forEach(function (x) {
                stack.push(parseTag(x.trim()));
            });
        }
        else {
            //its a single tag name
            stack.push(parseTag(input));
        }
        return stack;
    };
    var addContentItem = function (targetNode, contentItem) {
        var _asNode = function (targetParentNode, nodeContent) {
            var contentType = typeof nodeContent;
            var hasNodeName = nodeContent.nodeName ? true : false;
            if (contentType === 'object' && hasNodeName) {
                return nodeContent;
            }
            else {
                if (targetParentNode.tagName === 'UL' || targetParentNode.tagName === 'OL') {
                    return $e('li', nodeContent);
                }
                else if (targetParentNode.tagName === 'select') {
                    return $e('option', nodeContent);
                }
                return document.createTextNode(nodeContent);
            }
        }

        if (contentItem !== undefined) {
            if (Array.isArray(contentItem)) {
                contentItem.forEach(function (item) {
                    addContentItem(targetNode, item);
                });
            }
            else {
                targetNode.appendChild(_asNode(targetNode, contentItem));
            }
        }

        return targetNode;
    };

    var stack = parseStack(tag);

    if (arguments.length > 2) {
        content = [].slice.apply(arguments).slice(1);
    }

    while (stack.length) {
        var tag = stack.pop();
        var eNode = document.createElement(tag.name);
        if (tag.id) { eNode.setAttribute('id', id); }
        if (tag.className) { eNode.setAttribute('class', tag.className.split('.').join(' ')); }
        tag.attributes.forEach(function (attr) { eNode.setAttribute(attr.key, attr.value); });
        content = addContentItem(eNode, content);
    }
    return eNode;
};

$e()
====

A compact, portable, nestable, inline HTML (or any structure) generator helper for JavaScript.
    
QUICK GUIDE
-----------

This is a useful helper for creating DOM nodes dynamically.  It will construct and return 
a valid node from the supplied tag and content.  It supports shorthand notation, see examples below.
    
Content will automatically be wrapped in the matching opening and closing tags of the parent element, 
i.e. 

usage:  

```javascript
let newDomNode = $e(tagname, contentItem [, Item2, Item3, ItemN]);
```

example:

```javascript
let container = document.getElementById('dynamic_content');
container.appendChild( $e('div', 'My content') );
```

The outer html of the returned DOM node will be equivalent to:

```html
    <div>My content</div>    
``` 


MORE EXAMPLES
-------------
    
you can include raw html as content:

```
$e('div', '<h1>Big and bold</h1>')                
```
```
   <div><h1>Big and bold</h1></div>
```

or use the output of another $e() as content:

```
$e('div', $e('span','Label'))                                   
```
```
    <div><span>Label</span></div>
```

decorate elements as you pass them:  
    
with CSS classes:

```        
$e('div.square', 'I am fair and square')                            
```
```
    <div class="square">I am fair and square</div>
```

or multiple classes:
```
$e('div.square.clearfix', 'I am fair but I like my space')                        
```
```
    <div class="square">I am fair but I like my space</div>
```

pass attributes with values:
```
$e('div.square onclick="alert('Stop it!')"', 'Do not click me')     
```
```
    <div class="square" onclick="alert('Stop it!')">Do not click me</div>
```

mix raw html and other $e() tags:
```
$e('section', 
    '<h1>Welcome</h1>', 
    $e('p', 
        '$e supports multiple params which become sibling elements inside the parent tag'
    )
)
```
```
    <section>
        <h1>Welcome</h1>
        <p>$e supports multiple params which become sibling elements inside the parent tag</p>
    </section>
```

using multiple nested $e tags 
```    
$e('section', 
    $e('ul', 
        $e('li', 'Option 1'),
        $e('li', 'Option 2'),
        $e('li', 'Option 3')
    )
);
```
```
    <section>
        <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
        </ul>
    </section>
```

    

PASSING ARRAYS AS CONTENT
-------------------------

You can pass an array of items as content.  If an array element is literal, not a DOM Node, 
it will be added as plain text, so if you want to add them as HTML elements of any kind, 
you can wrap each one inline using Array.prototype.map() function.

like this:
```
let paragraphs = ['Lorem ipsum dolor sit amet, agam assentior ei vel.',
                'Eu sea regione vocibus ullamcorper, mea facer accumsan volutpat ne.',
                'Dolor argumentum at mea, tation vivendo ocurreret no mel...'];

$e('section', paragraphs.map(function(text) {
    return $e('p', text);    
});
```
```
    <section>
        <p>Lorem ipsum dolor sit amet, agam assentior ei vel.</p>
        <p>Eu sea regione vocibus ullamcorper, mea facer accumsan volutpat ne.</p>
        <p>Dolor argumentum at mea, tation vivendo ocurreret no mel...</p>
    </section>
``` 

or create those same items as a list (and use an arrow function too):

```
$e('ul', paragraphs.map((text)=>{ return $e('li', text); });
```
```
    <ul>
        <li>Lorem ipsum dolor sit amet, agam assentior ei vel.</li>
        <li>Eu sea regione vocibus ullamcorper, mea facer accumsan volutpat ne.</li>
        <li>Dolor argumentum at mea, tation vivendo ocurreret no mel...</li>
    </ul>
```



AUTOMATIC LIST ITEMS
--------------------

**UL**, **OL**

When you pass an array as content for a UL or OL element, $e() will automatically 
wrap each item in an <li> tag:
```  
$e('ul', randomthoughts);
```
```
    <ul> 
        <li>I want to go to space</li>
        <li>What if there is no spoon?</li>
    </ul>
``` 

**SELECT**
        
The same thing happens with <select> element, all literal array items (if they are not DOM nodes) 
will be wrapped in OPTION elements:

```
$e('select', levels);
```
```
    <select> 
        <option>Level 1</option>
        <option>Level 2</option>
    </select>
``` 
> NOTE: This needs to be extended to support specifying selected item, if not map() can be used
    


DEEPLY NESTED ITERATION
-----------------------

You can also create nested structures using a shorthand stack notation:
```
$e('section > div > ul', itemArray)  
```

This will generate a nested structure, with only the last element being repeated.
    
`section>div>ul` is a stack that will result in the following HTML equivalent:

```
<section>
    <div>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
    </div>
<section/>
```

$e()
====
`$e(tagname, contentItem [, Item2, Item3, ItemN]);`

A compact, portable, nestable, inline HTML (or any structure) generator helper for JavaScript.

**It lets you do simple things like this:** 
```javascript
    parentNode.appendChild( $e('h1', 'Hello Mars!') );
```
```html
    <!-- HTML -->
    <h1>Hello Mars!</h1>
``` 

**or, more interesting things like this:**
```javascript
    let things = ['Finish code', 'Buy milk', 'Feed cat'];
    let todo = $e('div.reminder onclick="snooze"', 
                 $e('h1', 'To do'),
                 $e('ol', things)
                 );
                                
    //show the pop-up later   
```
```html
    <!-- result -->
    <div class="reminder" onclick="snooze">
        <h1>To do</h1>
        <ol>
            <li>Finish code</li>
            <li>Buy milk</li>
            <li>Feed cat</li>
        </ol>
    </div>
``` 

**easily!**



ABOUT
-----------

This is a useful helper for creating DOM nodes dynamically.  It will construct and return 
a valid node from the supplied tag and content.  It supports shorthand notation, see examples below.
    
Content will automatically be wrapped in the matching opening and closing tags of the parent element, 
The outer html of the returned DOM node will be equivalent to:



MORE EXAMPLES
-------------
    
you can include raw html as content:

```javascript
$e('div', '<h1>Big and bold</h1>')                
```
```html
   <div><h1>Big and bold</h1></div>
```

or use the output of another $e() as content:

```javascript
$e('div', $e('span','Label'))                                   
```
```html
    <div><span>Label</span></div>
```

decorate elements as you pass them:  
    
with CSS classes:

```javascript        
$e('div.square', 'I am fair and square')                            
```
```html
    <div class="square">I am fair and square</div>
```

or multiple classes:
```javascript
$e('div.square.clearfix', 'I am fair but I like my space')                        
```
```html
    <div class="square">I am fair but I like my space</div>
```

pass attributes with values:
```javascript
$e('div.square onclick="alert('Stop it!')"', 'Do not click me')     
```
```html
    <div class="square" onclick="alert('Stop it!')">Do not click me</div>
```

mix raw html and other $e() tags:
```javascript
$e('section', 
    '<h1>Welcome</h1>', 
    $e('p', 
        '$e supports multiple params which become sibling elements inside the parent tag'
    )
)
```
```html
    <section>
        <h1>Welcome</h1>
        <p>$e supports multiple params which become sibling elements inside the parent tag</p>
    </section>
```

using multiple nested $e tags 
```javascript
$e('section', 
    $e('ul', 
        $e('li', 'Option 1'),
        $e('li', 'Option 2'),
        $e('li', 'Option 3')
    )
);
```
```html
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

```javascript
$e('ul', paragraphs.map((text)=>{ return $e('li', text); });
```
```html
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
```javascript
$e('ul', randomthoughts);
```
```html
    <ul> 
        <li>I want to go to space</li>
        <li>What if there is no spoon?</li>
    </ul>
``` 

**SELECT**
        
The same thing happens with `<select>` element, all literal array items (if they are not DOM nodes) 
will be wrapped in OPTION elements:

```javascript
$e('select', levels);
```
```html
    <select> 
        <option>Level 1</option>
        <option>Level 2</option>
    </select>
``` 
**NOTE**: *This needs to be extended to support specifying selected item, if not map() can be used*
    


DEEPLY NESTED ITERATION
-----------------------

You can also create nested structures using a shorthand stack notation:
```javascript
$e('section > div > ul', itemArray)  
```

This will generate a nested structure, with only the last element being repeated.
    
`section>div>ul` is a stack that will result in the following HTML equivalent:

```html
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

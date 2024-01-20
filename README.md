## kSDL - Select Dropdown List

>Languages: pure JavaScript + CSS<br/><br/>
>Version: kSDL v2023.1201<br/><br/>
>kSDL Oficial Page: https://appnexa.net/dev/kSDL/?f=fs37i<br/><br/>
>Author: Ivo Rubim - https://appnexa.net/dev/ivorubim/?f=fs37i<br/>

---

<b>Features:</b><br/>
- Functionality Options:<br/>
  - Multi-Select Mode: Enables selection of multiple items using checkboxes<br/>
  - Single-Select Mode: Allows selection of only one item using radio buttons<br/>

- `Control Bar` Contains:<br/>
  - Selection Control Button: Toggles selection/unselection of all items on `Item List`<br/>
  - Item Search Bar: Facilitates searching for specific items<br/>

- Right-Click (Under Container Link Trigger): Provides an alternative method to select/unselect all items<br/>

- Customizable `Control Bar` + `Item List`: Allowed customization of the appearance and behavior of both sections<br/>

- Container Overflow Prevention: Ensures proper display and prevents overflow on responsive pages<br/><br/>

---

<b>Basic Usage:</b><br/>

<b>Include the kSDL Library:</b> To integrate kSDL into your project, include the `kSDL.script.css` and `kSDL.style.js` files before other major page elements are loaded. Place this inclusion inside the `<head>` section of your HTML. Ensure that the `src` attribute in the `<script>` tag points to your kSDL library repository.<br/><br/>

 ```html 
<head>
  <link rel="stylesheet" href="kSDL.style.css">
  <script src="kSDL.script.js"></script>
</head>
 ```
<br/>

<b>Create HTML Containers:</b> In your HTML file, create container elements ( e.g., `<div>` ) with unique IDs where you want the kSDL component to be rendered.<br/><br/>

```html 
<div id="ID_Fruit"></div>
<div id="ID_Cities"></div>
```
<br/>

<b>Initialize kSDL:</b> Call the `kSDL.NEW()` function after the page has fully loaded, preferably after the `</body>` tag. Now, create an array of objects, each representing a dataset for a container identified by a unique ID.<br/>

Mandatory properties of each dataset:<br/>

`ContainerID:` - property to associate with the container where the dropdown list will be displayed.<br/>

`Name:` - property to specify the name of the array of checkboxes or radio buttons for each dropdown list, which will be used in form submissions.<br/>

`Settings:{}` - object to configure available settings as properties. Leaving it empty will assume default settings.<br/>

`ItemList:[]` - array should contain the items for each dropdown list, with each item defined with a properties `value:`, `label:`, and an optional `checked:` to set an item as checked by default when defined as "true".<br/><br/>

```javascript 
<script>

  kSDL.NEW([

    {
      ContainerID: "ID_Fruit",
      Name: "Fruit[]",
      Settings: { containerWidth: "200px", ctrl: false, singleSelectMode: true },
      ItemList: [

        {value: "Apple", label: "Apple" },
        {value: "Banana", label: "Banana" },
        {value: "Blueberry", label: "Blueberry" }

      ]
    },
    {
      ContainerID: "ID_Cities",
      Name: "Cities[]",
      Settings: { maxToggleItemDisplay: 5, pushValuesOnToggle: true },
      ItemList: [

        {value: "London", label: "London, United Kingdom", checked: true },
        {value: "Madrid", label: "Madrid, Spain" },
        {value: "Nuuk", label: "Nuuk, Greenland" },
        {value: "Oslo", label: "Oslo, Norway" },
        {value: "Paris", label: "Paris, France", checked: true },
        {value: "Prague", label: "Prague, Czech Republic" }

      ]
    }

  ]);

</script>
```
<br/>

---
<b>Available Settings:</b>

- <b>`allItemChecked:`</b> When set to `true`, all checkboxes on the list will be automatically checked by default. <i>(default: false)</i><br/>

- <b>`containerHeight:`</b> Sets the height of the main container. <i>(default: "auto")</i><br/>

- <b>`containerHeightMax:`</b> Sets the maximum height of the main container. <i>(default: "350px")</i><br/>

- <b>`containerWidth:`</b> Sets the width of the main container. <i>(default: "300px")</i><br/>

- <b>`Ctrl:`</b> Enables/Disables the entire `Control Bar`. <i>(default: true)</i><br/>

- <b>`CtrlSelection:`</b> true/false: Enables/Disables the `Item List` selection control button. <i>(default: true)</i><br/>

- <b>`CtrlSearch:`</b> Enables/Disables the Item Search Bar. <i>(default: true)</i><br/>

- <b>`fontSize:`</b> Changes the font size of the `Item List`. <i>(default: "12px")</i><br/>

- <b>`maxToggleItemDisplay:`</b> Determines the number of selected items that will be displayed in the trigger link. Anything exceeding this quantity will automatically be summarized in a counter of selected items. <i>(default: 2)</i><br/>

- <b>`maxToggleCharLength:`</b> Determines the length of characters that can be shown in the trigger link of the selected items accumulation. <i>(default: 50)</i><br/>

- <b>`singleSelectMode:`</b> Enables/Disables Single-Select Mode (which changes the appearance to radio buttons). <i>(default: false)</i><br/><br/>

`An expansion of settings awaits in the next version`

---

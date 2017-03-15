# MMM-peopleinspace
[howmanypeopleareinspacerightnow](http://www.howmanypeopleareinspacerightnow.com) module for MagicMirror<sup>2</sup>

## Dependencies
  * A [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror) installation


## Installation
  1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/jstuder/MMM-peopleinspace.git`
  2. Create an entry in your `config.js` file to tell this module where to display on screen.
  
 **Example:**
```
 {
    module: 'MMM-peopleinspace',
	position: 'top_left', // you may choose any location
	header: 'People in Space'
	config: {
		dayLabel : false,
		showNumber: true,
		showList: true,
	}
 },
```

## Config
| **Option** | **Description** |
| --- | --- |
| `dayLabel` | Set to `true` to label the days, default is false. |
| `showNumber` | Set to 'false' to hide the number of people in space, default is `true`. |
| `showList` | Set to `false` to hide the list of people in space, default is `true`.|
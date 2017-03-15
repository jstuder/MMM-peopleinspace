# MMM-peopleinspace
[howmanypeopleareinspacerightnow](http://www.howmanypeopleareinspacerightnow.com) module for MagicMirror<sup>2</sup>

![screen shot 2017-03-14 at 9 30 02 pm](https://cloud.githubusercontent.com/assets/2536200/23933832/79769634-08fe-11e7-9572-7310a5c123a9.png)


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

## Screenshots

#### Default Config
  ![screen shot 2017-03-14 at 9 30 02 pm](https://cloud.githubusercontent.com/assets/2536200/23933832/79769634-08fe-11e7-9572-7310a5c123a9.png)

#### with showNumber set to 'false'
  ![screen shot 2017-03-14 at 9 25 41 pm](https://cloud.githubusercontent.com/assets/2536200/23933890/dc2fb562-08fe-11e7-86dd-ef008563ae6a.png)

#### with showList set to 'false'
  ![screen shot 2017-03-14 at 9 26 15 pm](https://cloud.githubusercontent.com/assets/2536200/23933870/c6efb602-08fe-11e7-8fa1-b4361f1e9e85.png)

#### with dayLabel set to 'true'
  ![screen shot 2017-03-14 at 9 26 41 pm](https://cloud.githubusercontent.com/assets/2536200/23933957/413266d0-08ff-11e7-8746-47959415ae45.png)

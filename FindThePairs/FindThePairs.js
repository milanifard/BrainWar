const IMAGE_SLOT = "Images/slot-green.png";
const IMAGE_1 = "Images/dahlia.png";
const IMAGE_2 = "Images/daisy.png";
const IMAGE_3 = "Images/lavender.png";
const IMAGE_4 = "Images/lotus-flower.png";
const IMAGE_5 = "Images/orchid.png";
const IMAGE_6 = "Images/strawberry-blossoms.png";
const IMAGE_7 = "Images/sunflower.png";
const IMAGE_8 = "Images/tiger-lily.png";
const SLOT_BUTTON_PREFIX = "slotButton-";
const WAIT_DURATION = 2;

var _imageSources = [IMAGE_1, IMAGE_2, IMAGE_3, IMAGE_4, IMAGE_5, IMAGE_6, IMAGE_7, IMAGE_8];
var _imageSlots = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var _selectedSlots = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
var _isSecondClick = false;
var _firstSelectedIndex = 0;
var _secondSelectedIndex = 0;
var _isClickAllowed = true;
var _clickStartTime = 0;
var _date = new Date();

function $(id){
    return document.getElementById(id);
}

function RestartGame(){
    HideSlot(_firstSelectedIndex);
    HideSlot(_secondSelectedIndex);
    RandomizeSlots();
}

function RandomizeSlots(){
    var slotIndices = new Array(16);
    for(var i = 0; i < slotIndices.length; i++){
        slotIndices[i] = i;
    }

    for(var i = 0; i < _imageSources.length; i++){
        for(var j = 0; j < 2; j++){
            var randomIndex = Math.floor(Math.random() * slotIndices.length);
            var slotIndex = slotIndices[randomIndex];
            _imageSlots[slotIndex] = i;
            slotIndices.splice(randomIndex, 1);
        }
    }
}

function TryToClickSlot(index){
    if(_isClickAllowed){
        var isSelected = _selectedSlots[index];
        if(!isSelected){
            ClickSlot(index);
        }
    }
}

function ClickSlot(index){
    if(_isSecondClick){
        if(index === _firstSelectedIndex){
            HideSlot(index);
            _firstSelectedIndex = index;
        }
        else{
            ShowSlot(index);
            if(ArePairSlots(index, _firstSelectedIndex)){
                _selectedSlots[index] = true;
                _selectedSlots[_firstSelectedIndex] = true;
            }
            else{
                StartClickWaiting();
            }
            _secondSelectedIndex = index;
        }
    }
    else{
        ShowSlot(index);
        _firstSelectedIndex = index;
    }

    _isSecondClick = !_isSecondClick;
}

function HideSlot(index){
    $(SLOT_BUTTON_PREFIX + index.toString()).src = IMAGE_SLOT;
}

function ShowSlot(index){
    var imageIndex = _imageSlots[index];
    $(SLOT_BUTTON_PREFIX + index.toString()).src = _imageSources[imageIndex];
}

function ArePairSlots(index1, index2){
    return _imageSlots[index1] == _imageSlots[index2];
}

function StartClickWaiting(){
    _clickStartTime = GetNowSeconds();
    _isClickAllowed = false;
    setTimeout(HideWrongSelectedSlots, WAIT_DURATION * 1000);
}

function GetNowSeconds(){
    _date.getTime() / 1000;
}

function HideWrongSelectedSlots(){
    _isClickAllowed = true;
    HideSlot(_firstSelectedIndex);
    HideSlot(_secondSelectedIndex);
}

RestartGame();
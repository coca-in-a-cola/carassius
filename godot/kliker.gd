extends Control

@onready var label: Label = $Label2
@onready var button: Button = $Button

var counter = 0

func _ready() -> void:
	if OS.has_feature('web'):
		var saved = JavaScriptBridge.eval("+localStorage.getItem('count')")
		counter = saved
	button.pressed.connect(_button_pressed)
	
func _button_pressed():
	counter += 1
	JavaScriptBridge.eval("localStorage.setItem('count', %d);" % counter)
	label.text = str(int(counter))

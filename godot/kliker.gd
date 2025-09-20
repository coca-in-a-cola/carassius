extends Control

@onready var label: Label = $Label2
@onready var button: Button = $Button

@onready var counter = 0

func _ready() -> void:
	button.pressed.connect(_button_pressed)
	
func _button_pressed():
	counter += 1
	label.text = str(counter)

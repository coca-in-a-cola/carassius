extends MarginContainer

signal yes_chosen
signal no_chosen

func _ready() -> void:
	hide()
	$Card/MarginContainer/VBoxContainer/HBoxContainer/yes.pressed.connect(yes_chosen.emit)
	$Card/MarginContainer/VBoxContainer/HBoxContainer/no.pressed.connect(no_chosen.emit)

func show_card(card):
	visible = true
	$Card/MarginContainer/VBoxContainer/CardCategory.text = card['category']
	$Card/MarginContainer/VBoxContainer/CardText.text = card['text']

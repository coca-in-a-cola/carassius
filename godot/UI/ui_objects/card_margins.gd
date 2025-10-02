extends MarginContainer

signal yes_chosen
signal no_chosen

const categoryMap = {
	'work' = 'РАБОТА',
	'family' = 'СЕМЬЯ',
	'medicine' = 'ЗДОРОВЬЕ',
	'education' = 'ОБРАЗОВАНИЕ',
	'hobby' = 'ХОББИ',
	'financials' = 'ФИНАНСЫ'
}

func _ready() -> void:
	hide()
	var yesButton = $Card/MarginContainer/VBoxContainer/HBoxContainer/yes
	var noButton = $Card/MarginContainer/VBoxContainer/HBoxContainer/no
	yesButton.pressed.connect(yes_chosen.emit)
	noButton.pressed.connect(no_chosen.emit)
	yesButton.mouse_entered.connect(func(): yesButton.scale = Vector2(1.04, 1.04))
	yesButton.mouse_exited.connect(func(): yesButton.scale = Vector2(1, 1))
	noButton.mouse_entered.connect(func(): noButton.scale = Vector2(1.04, 1.04))
	noButton.mouse_exited.connect(func(): noButton.scale = Vector2(1, 1))

func hide_card():
	var tween = create_tween()
	tween.tween_property(self, "scale", Vector2.ZERO, 0.2)
	await tween.finished
	hide()

func show_card(card):
	scale = Vector2.ZERO
	visible = true
	$Card/MarginContainer/VBoxContainer/CardCategory.text = categoryMap[card['category']]
	$Card/MarginContainer/VBoxContainer/CardText.text = card['text']
	var tween = create_tween()
	tween.tween_property(self, "scale", Vector2(1, 1), 0.2)

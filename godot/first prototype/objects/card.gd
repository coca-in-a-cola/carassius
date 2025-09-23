extends HBoxContainer
class_name CardNode


@export var _card_data : CardRes : 
	set(value):
		$left_button.text = value.left_text
		$right_button.text = value.right_text
		$VBoxContainer/MainText.text = value.main_text
		_card_data = value

signal choice_made(effect : Array[Effect])

func _on_button_pressed() -> void:
	choice_made.emit(_card_data.left_effects)

func _on_button_2_pressed() -> void:
	choice_made.emit(_card_data.right_effects)

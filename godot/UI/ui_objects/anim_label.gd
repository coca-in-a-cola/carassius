extends Label
class_name AnimatedLabel

var _int_value: int:
	set(new_value):
		text = str(new_value)
		_int_value = new_value

func _ready() -> void:
	_int_value = 0

func set_value(value: int):
	var tween = create_tween()
	tween.tween_property(self, "_int_value", value, 0.5)
	await tween.finished

extends Label
class_name AnimatedIntLabel

const anim_time = 0.5

@export var main_text : String 
var main_value : int
var int_value : int :
	set(value):
		text = get_label_text(int_value)
		int_value = value

func get_label_text(_with_value):
	pass

func set_value(new_value: int):
	main_value = new_value
	var tween = create_tween()
	tween.tween_property(self, "int_value", main_value, anim_time)
	await tween.finished
	text = get_label_text(main_value)

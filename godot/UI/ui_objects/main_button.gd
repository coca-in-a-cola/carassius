extends TextureButton
class_name CategoryButton

@export var category: String

func _ready() -> void:
	mouse_entered.connect(func(): scale = Vector2(1.04, 1.04))
	mouse_exited.connect(func(): scale = Vector2(1, 1))

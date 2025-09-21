extends RefCounted
class_name Card

var id: int
var text: String
var category: String

func _init(card_id: int, card_text: String, card_category: String):
	id = card_id
	text = card_text
	category = card_category

extends Node


var turn = 0

@export var current_card : CardNode

@export var card_meta_array : Array[CardRes]
@export var late_random_events : Array[CardRes]
@export var regular_events : Array[CardRes]


func _on_h_box_container_choice_made(__effects) -> void:
	turn += 1
	if turn % 3 == 0:
		set_next_card(regular_events.pick_random())
	elif turn >= card_meta_array.size():
		set_next_card(late_random_events.pick_random())
	else:
		set_next_card(card_meta_array[turn])
	print(turn)



func set_next_card(card: CardRes):
	current_card._card_data = card

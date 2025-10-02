extends Control

@onready var cardMargins = $CardMargins
@onready var statsBackground = $TextureRect/MainContainer/StatsBackground

func _ready() -> void:
	Network.player_data_updated.connect(_player_data_updated)
	cardMargins.yes_chosen.connect(func(): Network.select_yes())
	cardMargins.no_chosen.connect(func(): Network.select_no())
	for child in $TextureRect/MainContainer/MainButtons.get_children():
		if child is CategoryButton:
			child.pressed.connect(func(): _category_chosen(child.category))

func _category_chosen(category):
	Network.select_card(category)

func _player_data_updated(player_data):
	if player_data.has('selectedCard') and player_data['selectedCard'] != null:
		var card = player_data['selectedCard']
		cardMargins.show_card(card)
	else:
		cardMargins.hide_card()
	statsBackground.update(player_data)

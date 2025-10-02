extends TextureRect

func update(player_data):
	var money = player_data['money']
	var health
	var spirit
	for stat in player_data['stats']:
		if stat['id'] == 'health':
			health = stat['value']
		if stat['id'] == 'spirit':
			spirit = stat['value']
	$MarginContainer/HBoxContainer/HBoxContainer/MoneyLabel.set_value(int(money))
	$MarginContainer/HBoxContainer/HBoxContainer2/SpiritLabel.set_value(int(spirit))
	$MarginContainer/HBoxContainer/HBoxContainer3/HealthLabel.set_value(int(health))

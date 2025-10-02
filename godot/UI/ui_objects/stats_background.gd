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
	$MarginContainer/HBoxContainer/HBoxContainer/MoneyLabel.text = str(int(money))
	$MarginContainer/HBoxContainer/HBoxContainer2/SpiritLabel.text = str(int(spirit))
	$MarginContainer/HBoxContainer/HBoxContainer3/HealthLabel.text = str(int(health))

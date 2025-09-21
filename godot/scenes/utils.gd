extends Node

func parse_cards_from_string(string: String) -> Array[Card]:
	var result: Array[Card] = []
	var parsed_csv = parse_csv_from_string(string)
	parsed_csv.pop_front() # remove first line of table (id, text, category)
	for card_data in parsed_csv:
		var card_id = int(card_data[0])
		var card_text = card_data[1]
		var category = card_data[2]
		result.append(Card.new(card_id, card_text, category))
	return result

func parse_csv_from_string(csv_string: String) -> Array:
	var parsed_data: Array = []
	var lines: PackedStringArray = csv_string.split("\n", false)
	for line in lines:
		if line.is_empty():
			continue
		var row_data: Array = []
		var current_field: String = ""
		var in_quote: bool = false
		for i in range(line.length()):
			var ch = line[i]
			if ch == '"':
				in_quote = not in_quote
			elif ch == ',' and not in_quote:
				row_data.append(current_field.strip_edges())
				current_field = ""
			else:
				current_field += ch
		row_data.append(current_field.strip_edges())
		parsed_data.append(row_data)

	return parsed_data

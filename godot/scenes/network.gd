extends Node

var httpRequest: HTTPRequest
var cardsUrl = "https://pastebin.com/raw/40v2pbUk"

func _ready() -> void:
	httpRequest = HTTPRequest.new()
	add_child(httpRequest)

func get_cards():
	var err = httpRequest.request(cardsUrl)
	if err != OK:
		print("get cards failed")
		return
	var res = await httpRequest.request_completed
	return Utils.parse_cards_from_string(res[3].get_string_from_utf8())

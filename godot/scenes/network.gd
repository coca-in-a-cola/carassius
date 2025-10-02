extends Node

var httpRequest: HTTPRequest
var baseURL: String

var UUID: String = ""

var player_data

signal player_data_updated(player_data)

const CardCategory = {
  WORK = 'work',
  FAMILY = 'family',
  MEDICINE = 'medicine',
  EDUCATION = 'education',
  HOBBY = 'hobby',
  FINANCIALS = 'financials'
}

func _ready() -> void:
	baseURL = JavaScriptBridge.eval("`${window.location.origin}/api/`")
	if not await check_uuid():
		print("starting new game")
		await new_game()
	if player_data == null:
		await get_player()

func api(url, method=HTTPClient.Method.METHOD_GET, headers=[], body=""):
	var processed_headers = headers.duplicate()
	processed_headers.append("X-Player-UUID: " + UUID)
	print("Sending request to: ", url)

	var http_request = HTTPRequest.new()
	add_child(http_request)
	var err = http_request.request(baseURL + url, processed_headers, method, body)
	var result = await http_request.request_completed
	http_request.queue_free()

	var status_code = result[1]
	var response_body = result[3].get_string_from_utf8()
	print("Received response with status: ", status_code)
	if err != OK || status_code >= 300:
		print("Error: ", response_body)
	if status_code < 300:
		response_body = JSON.parse_string(response_body)
		if response_body.has("uuid"):
			update_player(response_body)
		elif response_body.has("data") and response_body['data'].has("player"):
			update_player(response_body['data']['player'])
	return {"status": status_code, "body": response_body}

func check_uuid() -> bool:
	var saved_uuid = JavaScriptBridge.eval("localStorage.getItem('uuid')")
	if saved_uuid == null:
		return false
	UUID = saved_uuid
	var res = await get_player()
	return res['success']

func update_player(new_player: Dictionary):
	player_data = new_player.duplicate(true)
	player_data_updated.emit(player_data)

func get_player():
	var res = (await api("player/" + UUID))['body']
	return res

func select_card(category):
	var res = (await api("card/select/" + category))['body']
	return res

func select_yes():
	return (await api("card/yes", HTTPClient.Method.METHOD_POST))['body']
	
func select_no():
	return (await api("card/no", HTTPClient.Method.METHOD_POST))['body']

func req_start_game():
	var data = (await api("start", HTTPClient.Method.METHOD_POST))['body']
	return data

func new_game() -> void:
	var data = await req_start_game()
	UUID = data['data']['player']['uuid']
	JavaScriptBridge.eval("localStorage.setItem('uuid', '%s')" % UUID)

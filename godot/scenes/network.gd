extends Node

var httpRequest: HTTPRequest
var baseURL: String

func _ready() -> void:
	httpRequest = HTTPRequest.new()
	baseURL = JavaScriptBridge.eval("window.location.origin")
	print(baseURL)
	add_child(httpRequest)

func start_game() -> void:
	pass

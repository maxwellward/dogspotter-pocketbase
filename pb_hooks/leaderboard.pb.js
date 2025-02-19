routerAdd("GET", "/leaderboard", async (e) => {
	const topUsersResult = arrayOf(new DynamicModel({
		"username": "",
		"totalPoints": 0,
	}))

	$app.db()
		.newQuery("SELECT username, totalPoints FROM users ORDER BY totalPoints DESC LIMIT 5")
		.all(topUsersResult)

	return e.json(200, { "topUsers": topUsersResult })
})

routerAdd("GET", "/leaderboard/{id}", async (e) => {
	let id = e.request.pathValue("id")

	const userPointsResult = new DynamicModel({
		"totalPoints": 0,
	})

	$app.db()
		.newQuery("SELECT totalPoints FROM users WHERE id = {:id}")
		.bind({
			"id": id,
		})
		.one(userPointsResult)

	const points = userPointsResult['totalPoints'];

	const leaderboardResult = arrayOf(new DynamicModel({
		"id": "",
	}))

	$app.db()
		.newQuery("SELECT id FROM users WHERE totalPoints > {:score}")
		.bind({
			"score": points,
		})
		.all(leaderboardResult)

	return e.json(200, { "position": leaderboardResult.length + 1 })
})
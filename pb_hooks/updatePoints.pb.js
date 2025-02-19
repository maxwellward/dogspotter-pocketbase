onRecordAfterUpdateSuccess(async (e) => {
	try {
		const record = JSON.stringify(e.record);

		const userIdMatch = record.match(/"userId":"(.*?)"/);
		const userId = userIdMatch ? userIdMatch[1] : null;

		const recordsWithPoints = arrayOf(new DynamicModel({
			score: 0,
		}));

		$app.db()
			.newQuery("SELECT score FROM submissions WHERE userId = {:userId} AND reviewed = true")
			.bind({
				"userId": userId,
			})
			.all(recordsWithPoints);

		const totalPoints = recordsWithPoints.reduce((sum, s) => sum + s.score, 0);

		let user = $app.findRecordById("users", userId);
		user.set("totalPoints", totalPoints)
		$app.save(user);
	} catch (error) {
		console.error(error);
	}

	e.next()
}, "submissions")

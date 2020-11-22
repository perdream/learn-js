'use strict';
const os = require('os');
//执行shell命令的库
const execa = require('execa');

//相同参数值防止重复调用，提高性能的库
const mem = require('mem');

//从环境变量（process.env）中获取用户名（如果存在的话）
const getEnvironmentVariable = () => {
	const {env} = process;

	return (
		env.SUDO_USER ||
		env.C9_USER /* Cloud9 */ ||
		env.LOGNAME ||
		env.USER ||
		env.LNAME ||
		env.USERNAME
	);
};

//从系统信息中获取用户名
const getUsernameFromOsUserInfo = () => {
	try {
		return os.userInfo().username;
	} catch (_) {} //catch 劫持错误并且不返回错误信息，则默认返回undefined
};

//正则获取shell命令返回的用户名
const cleanWindowsCommand = string => string.replace(/^.*\\/, '');

const makeUsernameFromId = userId => `no-username-${userId}`;

module.exports = mem(async () => {
    const envVariable = getEnvironmentVariable();
    //环境变量中存在用户名则返回
	if (envVariable) {
		return envVariable;
	}

    const userInfoUsername = getUsernameFromOsUserInfo();
    //系统信息中存在用户名则返回
	if (userInfoUsername) {
		return userInfoUsername;
	}

	/**
    First we try to get the ID of the user and then the actual username. We do this because in `docker run --user <uid>:<gid>` context, we don't have "username" available. Therefore, we have a fallback to `makeUsernameFromId` for such scenario. Applies also to the `sync()` method below.
    首先，我们尝试获取用户的ID，然后获取实际用户名。我们这样做是因为在`docker run--user<uid>：<gid>`上下文中，没有“username”可用。因此，对于这样的场景，我们可以回退到“makeUsernameFromId”。也适用于下面的“sync（）”方法。
    */
	try {
		if (process.platform === 'win32') {
            //如果是windows 系统则执行通过execa库执行shell命令'whoami'获取当前用户
			return cleanWindowsCommand(await execa.stdout('whoami'));
		}

        //其他系统则首先通过id -u 的shell命令获取当前用户id，再通过用户id执行id -un userId 获取用户名
		const userId = await execa.stdout('id', ['-u']);
		try {
			return await execa.stdout('id', ['-un', userId]);
		} catch (_) {}//空函数返回undefined

        //在`docker run--user<uid>：<gid>`上下文中，没有“username”可用，则返回‘no-username-${userId}’的提示
		return makeUsernameFromId(userId);
	} catch (_) {}
});

//同步方法
module.exports.sync = mem(() => {
	const envVariable = getEnvironmentVariable();
	if (envVariable) {
		return envVariable;
	}

	const userInfoUsername = getUsernameFromOsUserInfo();
	if (userInfoUsername) {
		return userInfoUsername;
	}

	try {
		if (process.platform === 'win32') {
			return cleanWindowsCommand(execa.sync('whoami').stdout);
		}

		const userId = execa.sync('id', ['-u']).stdout;
		try {
			return execa.sync('id', ['-un', userId]).stdout;
		} catch (_) {}

		return makeUsernameFromId(userId);
	} catch (_) {}
});

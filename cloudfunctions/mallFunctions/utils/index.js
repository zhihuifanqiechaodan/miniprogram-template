const crypto = require('crypto');
const { z } = require('zod')

function handleError(error, message = "操作失败", code = 500) {
    if (error instanceof z.ZodError) {
        return {
            code: 400,
            message: "参数验证失败",
            errors: error.issues.map((err) => ({
                field: err.path.join("."),
                message: err.message,
            })),
        };
    }

    return {
        code,
        message,
        error: error?.message || "未知错误",
    };
}
function handleUuid() {
    return crypto.randomUUID().replace(/-/g, "")
}

module.exports = {
    handleError,
    handleUuid
}
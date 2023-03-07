export default class Command {
    constructor(client, options) {
        this.client = client
        this.name = options.name
        this.ephemeral = options.ephemeral
        this.description = options.description
        this.options = options.options
        this.default_member_permission = options.default_member_permission
        this.nsfw = options.nsfw
    }
}
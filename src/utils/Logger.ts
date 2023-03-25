import chalk from "chalk";

export default {
  info(message: string) {
    console.log(chalk.yellow("[INFO]") + chalk.gray("         ") + chalk.reset(message));
  },

  success(message: string) {
    console.log(chalk.green("[SUCCESS]") + chalk.gray("      ") + chalk.reset(message));
  },

  error(message: string) {
    console.log(chalk.red("[ERROR]") + chalk.gray("        ") + chalk.reset(message));
  },

  request(message: string) {
    console.log(chalk.blue("[REQUEST]") + chalk.gray("      ") + chalk.reset(message));
  },

  where(message: string) {
    console.log(chalk.blue("[WHERE I AM]") + chalk.gray("   ") + chalk.reset(message));
  }
};
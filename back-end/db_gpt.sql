-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: db_gpt
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `templates`
--

DROP TABLE IF EXISTS `templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `templates` (
  `id` int DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `descp` varchar(200) DEFAULT NULL,
  `content` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templates`
--

LOCK TABLES `templates` WRITE;
/*!40000 ALTER TABLE `templates` DISABLE KEYS */;
INSERT INTO `templates` VALUES (1,'color poem','familyfriendpoem','This template is to write user a poem with (color) {replace}','\n I want you to write me a poem about {replace}, the format of the poem should be like:\n \n {replace} looks like…\nIt sounds like…\nThe {replace} smells like…\nIt tastes like…\n{replace} feels like...\n'),(2,'cinquain','familyfriendopem','This template is to write user a cinquain with {replace}','I want you to write me a cinquain about {replace}, the format should be: \nLine 1 - noun\nLine 2 - adjctives\nLine 3 - ing words\nLine 4 - phrase\nLine 5 another word for the noun from line 1 (synonym or sums it up)\n'),(3,'diamante','familyfriendopem','This template is to write user a diamante poem that uses a string of words to describe one topic or two that are opposing. ','I want you to write me a diamante poem with {replace} (and {replace}), the format should be: \n\nLine 1: 1 word (subject/noun) \nLine 2: 2 adjectives that describe line 1 \nLine 3: 3 -ing words that relate to line 1 \nLine 4: 4 nouns (first 2 relate to line 1, last 2 relate to line 7--if you are writing about opposite topics )\nLine 5: 3 -ing words that relate to line 7 \nLine 6: 2 adjectives that describe line 7 \nLine 7: 1 word (subject/noun)\n\n '),(4,'APA Style Essay','essaymaker','This template is to write user an essay with {replace} in APA style','\nI want you to write me an essay in APA style, the format should be: \n\nThe essay should incloud : \nINTRODUCTION: the introduction guides your reader into the paper by grabbing attention and introducing the topic. \nTHESIS STATEMENT: the thesis statement states concisely the main idea of the essay, sets limits on the topic, and indicates the organization of the essay.\nBODY: the body of the essay supports the main points of the thesis.\nRANSITIONS: transitions help paragraphs connect to each other and to the thesis. \nCONCLUSION: the conclusion brings together all the main potints of the essay.\nCITATIONS: if your paper incorporates research, be sure ti ggive credit to each source.\n'),(5,'MLA style','essaymaker','This template is to write user an essay with {replace} in MLA style','\nI want you to write me an essay in MLA style with {repalce}, the format should be: \n\nThe essay should incloud : \nINTRODUCTION: the introduction guides your reader into the paper by grabbing attention and introducing the topic. \nTHESIS STATEMENT: the thesis statement states concisely the main idea of the essay, sets limits on the topic, and indicates the organization of the essay.\nBODY: the body of the essay supports the main points of the thesis.\nRANSITIONS: transitions help paragraphs connect to each other and to the thesis. \nCONCLUSION: the conclusion brings together all the main potints of the essay.\nCITATIONS: if your paper incorporates research, be sure ti ggive credit to each source.\n'),(6,'IEEE style','essaymaker','This template is to write user an essay with {replace} in IEEE style','\nI want you to write me an essay with {replace} in IEEE style, the format should be: \n\nThe essay should incloud : \nINTRODUCTION: the introduction guides your reader into the paper by grabbing attention and introducing the topic. \nTHESIS STATEMENT: the thesis statement states concisely the main idea of the essay, sets limits on the topic, and indicates the organization of the essay.\nBODY: the body of the essay supports the main points of the thesis.\nRANSITIONS: transitions help paragraphs connect to each other and to the thesis. \nCONCLUSION: the conclusion brings together all the main potints of the essay.\nCITATIONS: if your paper incorporates research, be sure ti ggive credit to each source.\n'),(7,'martial arts novel','111','This template is to write user a martial arts novel with {replace} words','\nI want you to write me a martial arts novel with {replace} words ,following are the instructions: \n①[Key points + hot words + exciting points]\n\nBe careful not to write some keywords that do not match your own novels for the sake of eyeballs, which will make readers feel bad.\n②[What type of heroine x what type of hero]\n(A simplified interpretation of the characters of the hero and heroine, so that readers can better understand the hero and heroine.)\n(The host and heroine settings in the introduction are very important, and you must not change or collapse the character settings casually later.)\n③ There are three short explanations for my novel.\n(Three sentences, at most four sentences, because many platforms will compress the typesetting of the introduction. If there are too many, the system will omit it, and readers will choose to ignore it.)\n④ Choose the classic lines of the characters in your own novels, with a sense of contrast, so as to better attract readers.\n\n'),(8,'fantasy novel','111','This template is to write user a fantasy novel with {replace} words','\nI want you to write me a martial arts novel with {replace} words ,following are the instructions: \n①[Key points + hot words + exciting points]\n\nBe careful not to write some keywords that do not match your own novels for the sake of eyeballs, which will make readers feel bad.\n②[What type of heroine x what type of hero]\n(A simplified interpretation of the characters of the hero and heroine, so that readers can better understand the hero and heroine.)\n(The host and heroine settings in the introduction are very important, and you must not change or collapse the character settings casually later.)\n③ There are three short explanations for my novel.\n(Three sentences, at most four sentences, because many platforms will compress the typesetting of the introduction. If there are too many, the system will omit it, and readers will choose to ignore it.)\n④ Choose the classic lines of the characters in your own novels, with a sense of contrast, so as to better attract readers.\n\n'),(9,'love novel','111','This template is to write user a love novel with {replace} words','\nI want you to write me a love novel with {replace} words ,following are the instructions: \n①[Key points + hot words + exciting points]\n\nBe careful not to write some keywords that do not match your own novels for the sake of eyeballs, which will make readers feel bad.\n②[What type of heroine x what type of hero]\n(A simplified interpretation of the characters of the hero and heroine, so that readers can better understand the hero and heroine.)\n(The host and heroine settings in the introduction are very important, and you must not change or collapse the character settings casually later.)\n③ There are three short explanations for my novel.\n(Three sentences, at most four sentences, because many platforms will compress the typesetting of the introduction. If there are too many, the system will omit it, and readers will choose to ignore it.)\n④ Choose the classic lines of the characters in your own novels, with a sense of contrast, so as to better attract readers.\n⑤ not homosexuality\n\n'),(10,'3*3matrix','222','This template is to help user to get the matrix eigenvalues of a 3*3 matrix','\nI want you to find the matrix eigenvalues of the 3*3 matrix and give the detailed process:\nrow1: {replace} {replace} {replace}\nrow2: {replace} {replace} {replace}\nrow3: {replace} {replace} {replace}\n'),(11,'4*4matrix','222','This template is to help user to get the matrix eigenvalues of a 4*4 matrix','\nI want you to find the matrix eigenvalues of the 4*4 matrix and give the detailed process:\nrow1: {replace} {replace} {replace} {replace} \nrow2: {replace} {replace} {replace} {replace} \nrow3: {replace} {replace} {replace} {replace} \nrow4: {replace} {replace} {replace} {replace} \n'),(12,'5*5matrix','222','This template is to help user to get the matrix eigenvalues of a 5*5 matrix','\nI want you to find the matrix eigenvalues of the 5*5 matrix and give the detailed process:\nrow1: {replace} {replace} {replace} {replace} {replace}\nrow2: {replace} {replace} {replace} {replace} {replace}\nrow3: {replace} {replace} {replace} {replace} {replace}\nrow4: {replace} {replace} {replace} {replace} {replace}\nrow5: {replace} {replace} {replace} {replace} {replace}\n');
/*!40000 ALTER TABLE `templates` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-01 18:02:57

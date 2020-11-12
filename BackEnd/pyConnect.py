import pymysql.cursors


class MySQLConnection:
    def __init__(self, host, user, password, schema, charset="latin1", port=3306):
        self.connection = pymysql.connect(
            host=host,
            user=user,
            password=password,
            database=schema,
            charset=charset,
            cursorclass=pymysql.cursors.DictCursor,
            port=port,
        )

    def __del__(self):
        self.connection.close()

    def fetch(self, sql: str):
        with self.connection.cursor() as cursor:
            cursor.execute(sql)
            return cursor.fetchall()

    def execute(self, sql: str):
        with self.connection.cursor() as cursor:
            cursor.execute(sql)

        self.connection.commit()

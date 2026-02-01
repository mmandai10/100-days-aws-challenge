import boto3

def lambda_handler(event, context):
    ses = boto3.client('ses', region_name='ap-northeast-1')
    
    ses.send_email(
        Source='mitsuharu.mandai@outlook.jp',
        Destination={'ToAddresses': ['mitsuharu.mandai@outlook.jp']},
        Message={
            'Subject': {'Data': 'Reminder: Claude Max to Pro Downgrade', 'Charset': 'UTF-8'},
            'Body': {
                'Text': {
                    'Data': 'Reminder: Downgrade Claude Max to Pro before Feb 10 billing date.',
                    'Charset': 'UTF-8'
                }
            }
        }
    )
    
    return {'statusCode': 200, 'body': 'Email sent'}

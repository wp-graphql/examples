<?php

use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

function axistaylor_send_inquiry() {
  $config = [
    'inputFields' => [
      'name' => [
        'type'        => [ 'non_null' => 'String' ],
        'description' => __( 'Sender\'s name', 'axistaylor' ),
      ],
      'email' => [
        'type'        => [ 'non_null' => 'String' ],
        'description' => __( 'Sender\'s e-mail', 'axistaylor' ),
      ],
      'phone' => [
        'type'        => 'String',
        'description' => __( 'Sender\'s phone', 'axistaylor' ),
      ],
      'url' => [
        'type'        => 'String',
        'description' => __( 'Sender\'s website url', 'axistaylor' ),
      ],
      'message' => [
        'type'        => [ 'non_null' => 'String' ],
        'description' => __( 'Inquiry message', 'axistaylor' ),
      ],
    ],
    'outputFields' => [
      'status' => [
        'type'        => 'String',
        'description' => __( 'Status of inquiry process', 'axistaylor' ),
        'resolve'     => function ( $payload ) {
          return $payload['status'];
        }
      ],
      'message' => [
        'type'        => 'String',
        'description' => __( 'Inquiry process response message', 'axistaylor' ),
        'resolve'     => function ( $payload ) {
          return $payload['message'];
        }
      ],
    ],
    'mutateAndGetPayload' => function( $input, AppContext $content, ResolveInfo $info ) {
      // Sanitize request data
      $data = [
        'name' => sanitize_text_field( $input[ 'name' ] ),
        'email' => sanitize_email( $input[ 'email' ] ),
        'message' => sanitize_textarea_field( $input[ 'message'] ),
      ];

      if( isset( $input['phone' ] ) ) {
        $data[ 'phone' ] = sanitize_text_field( $input[ 'phone' ] );
      }

      if( isset( $input[ 'url' ] ) ) {
        $data[ 'url' ] = sanitize_text_field( $input[ 'url' ] );
      }

      // Build and send E-mail
      $mailto = 'Webmaster <' . get_option( 'admin_email' ) . '>';
      $subject = 'New inquiry from ' . $data[ 'name' ];
      $message = <<<HTML
      <h1>Congrats!!! Someone asked about you.</h1>
      <p>
        <b>Message:</b>{$data['message']}<br/>
        <b>Name:</b>{$data['name']}<br/>
        <b>Email:</b>{$data['email']}<br/>
        <b>Phone:</b>{$data['phone']}<br/>
        <b>Website:</b>{$data['url']}
      </p>
HTML;
      $failed = wp_mail( $mailto, $subject, $message );

      // Create success response upon success
      if ( $failed == false ) {
        return [
          'message' => 'Thanks for your inquiry, we get back to you as soon as possible',
          'status'  => 'SUCCESS',
        ];
      }

      // Create error response upon failure
      return [
        'message' => 'Sorry, inquiry request failed. Please, try again later!',
        'status'  => 'FAILURE',
      ];
    }
  ];

  register_graphql_mutation( 'sendInquiry', $config );
}
add_action( 'graphql_register_types', 'axistaylor_send_inquiry' );